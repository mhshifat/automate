import { db } from "@/db/drizzle";
import { connections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

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
  
  return NextResponse.json(data);
}