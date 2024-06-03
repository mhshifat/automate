import { db } from "@/db/drizzle";
import { connections } from "@/db/schema";
import { googleClient } from "@/lib/googleClient";
import { createId } from "@paralleldrive/cuid2";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const code = searchParams.get("code");
    const state = JSON.parse(searchParams.get("state") || "{}");
    if (!code) return new NextResponse('Invalid code', { status: 400 });
    
    const response = await fetch(`${process.env.SLACK_ACCESS_TOKEN_GET_URI}&code=${code}`, {
      method: "POST"
    });
    const { ok, ...rest } = (await response.json()) as { ok: boolean };

    const payload = {
      type: "SLACK",
      title: "Slack",
      description: "Connection to slack api",
      metadata: JSON.stringify(rest),
    }
    await db
      .insert(connections)
      .values({
        id: createId(),
        userId: state.uid,
        createdAt: new Date(),
        ...payload
      })
      .onConflictDoUpdate({
        target: [connections.type, connections.userId],
        set: {
          ...payload,
          updatedAt: new Date(),
        }
      })
      .returning({ id: connections.id });
  } catch (err) {
    console.log(err);
  }

  return redirect("/connections");
}