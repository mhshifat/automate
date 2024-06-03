import { db } from "@/db/drizzle";
import { connections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: Request, { params }: { params: { channelId: string } }) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  
  try {
    const [connection] = await db
      .select({ metadata: connections.metadata })
      .from(connections)
      .where(
        and(
          eq(connections.userId, user.id),
          eq(connections.type, "SLACK"),
        )
      )
      .limit(1);
    const parsedMetadata = JSON.parse(connection.metadata || "{}");

    const payload = {
      text: body!.content,
      channel: params.channelId
    }
    
    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Authorization": `Bearer ${parsedMetadata?.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    await res.json();
  } catch (err) {
    console.log(err);
  }

  return new NextResponse("Message posted", { status: 201 });
}