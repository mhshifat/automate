import { googleClient } from "@/lib/googleClient";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const uri = await googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: process.env.GOOGLE_SCOPES?.split(","),
    state: JSON.stringify({
      uid: user.id
    })
  });

  return redirect(uri);
}