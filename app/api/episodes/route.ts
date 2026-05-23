import { NextResponse } from "next/server";
import { episodes } from "@/lib/data/episodes";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    episodes: episodes.map(({ script, transcript, ...rest }) => rest)
  });
}
