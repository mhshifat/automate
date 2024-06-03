import { db } from "@/db/drizzle";
import { connections } from "@/db/schema";
import { googleClient } from "@/lib/googleClient";
import { createId } from "@paralleldrive/cuid2";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get("code");
  const state = JSON.parse(searchParams.get("state") || "{}");
  if (!code) return new NextResponse('Invalid code', { status: 400 });
  const { tokens } = await googleClient.getToken(code);

  const payload = {
    type: "GOOGLE_DRIVE",
    title: "Google Drive",
    description: "Connection to google drive api",
    metadata: JSON.stringify(tokens),
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

  return redirect("/connections");
}