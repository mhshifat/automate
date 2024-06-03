import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const headersList = headers()
    let channelResourceId
    headersList.forEach((value, key) => {
      if (key == 'x-goog-resource-id') {
        channelResourceId = value
      }
    });
    if (!channelResourceId) return new NextResponse("Webhook failed!", { status: 500 });
    console.log("Message sent");
  } catch (err) {
    console.log(err);
  }

  return new NextResponse("New changes detected!", { status: 200 });
}