import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  return redirect(`${process.env.SLACK_AUTH_STRING}&state=${JSON.stringify({ uid: user.id })}`);
}