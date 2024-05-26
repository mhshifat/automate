import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import { createId } from '@paralleldrive/cuid2';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email_addresses, image_url, first_name, last_name, id } = body.data;
    const email = email_addresses?.[0]?.email_address;

    const payload = {
      avatar: image_url,
      name: `${first_name} ${last_name}`,
      clerkId: id,
      email,
    }
    await db
      .insert(users)
      .values({
        id: createId(),
        createdAt: new Date(),
        ...payload
      })
      .onConflictDoUpdate({
        target: users.clerkId,
        set: {
          ...payload,
          updatedAt: new Date()
        }
      })
      .returning({ id: users.id });
    return new NextResponse("Successfully updated user data", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}