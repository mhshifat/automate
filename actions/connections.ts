"use server";

import { db } from "@/db/drizzle";
import { connections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getConnections() {
  const user = await currentUser();
  if (!user) return;

  const data =  await db
    .select({
      id: connections.id,
      title: connections.title,
      description: connections.description,
      type: connections.type,
    })
    .from(connections)
    .where(
      eq(connections.userId, user.id)
    );
  
  return data;
}