import { db } from "@/db/drizzle";
import { connections, workflows } from "@/db/schema";
import { googleClient } from "@/lib/googleClient";
import { currentUser } from "@clerk/nextjs/server";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const searchParams = new URL(req.url).searchParams;
  const flowId = searchParams.get("flowId");
  if (!flowId) new NextResponse("Flow id is required", { status: 400 });
  const [data] = await db
    .select({
      id: connections.id,
      metadata: connections.metadata
    })
    .from(connections)
    .where(
      and(
        eq(connections.userId, user.id),
        eq(connections.type, "GOOGLE_DRIVE"),
      )
    );

  const parsedMetadata = JSON.parse(data.metadata || "{}");
  googleClient.setCredentials({
    access_token: parsedMetadata.access_token,
    refresh_token: parsedMetadata.refresh_token
  });
  const driveClient = google.drive({
    version: "v2",
    auth: googleClient
  });
  const foldersRes = await driveClient.files.list({ maxResults: 10 });
  const folders = foldersRes?.data?.items?.filter(item => item?.mimeType === 'application/vnd.google-apps.folder');
  const folderId = folders?.[0]?.id;
  if (!folderId) return new NextResponse("No folder found to watch", { status: 401 });
  const listener = await driveClient.files.watch({
    fileId: folderId,
    requestBody: {
      id: createId(),
      type: 'web_hook',
      address: `${process.env.GOOGLE_NOTIFICATIONS_URI}`
    }
  })
  await db
    .update(workflows)
    .set({
      googleResourceId: listener?.data?.resourceId
    })
    .where(
      and(
        eq(workflows.userId, user.id),
        eq(workflows.id, flowId!),
      )
    )
    .returning({ id: workflows.id });
  return new NextResponse("Listening...", { status: 200 });
}