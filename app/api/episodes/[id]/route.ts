import { NextResponse } from "next/server";
import { episodes } from "@/lib/data/episodes";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const episode = episodes.find((item) => item.id === params.id || item.slug === params.id);

  if (!episode) {
    return NextResponse.json({ error: "Episode not found" }, { status: 404 });
  }

  return NextResponse.json({ episode });
}
