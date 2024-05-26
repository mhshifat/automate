"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUserDetails() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const [userDetails] = await db
      .select({
        id: users.id,
        clerkId: users.clerkId,
        name: users.name,
        email: users.email,
        avatar: users.avatar,
      })
      .from(users)
      .where(
        eq(users.clerkId, user.id)
      );

    return userDetails;
  } catch (err) {
    return null;
  }
}