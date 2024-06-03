import { db } from "@/db/drizzle";
import { connections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
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

  let channels = [];

  try {
    const response = await fetch("https://slack.com/api/conversations.list", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${parsedMetadata?.access_token}`
      }
    });
    const data = (await response.json()) as any;
    channels = data.channels;
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json(channels);
}