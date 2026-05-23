import { NextResponse } from "next/server";
import { fetchPaperFromArxiv, isArxivUrl } from "@/lib/arxiv";
import { generateEpisodeFromPaper, shouldUseMock } from "@/lib/models";
import type { Paper } from "@/lib/types";

export const runtime = "nodejs";

const MOCK_PAPER: Paper = {
  title: "Scaling Laws for Multimodal Reasoning Models",
  abstract:
    "We study how multimodal reasoning models trade off compute, data, and modality coverage. Our analysis reveals that high-quality reasoning traces dominate scaling efficiency once vision and audio are jointly modeled.",
  authors: ["Y. Chen", "L. Zhao", "M. Park"],
  url: "https://arxiv.org/abs/2406.12345",
  excerpts: [
    "Introduction: motivation for unifying reasoning across modalities.",
    "Method: shared encoder + reasoning-aware decoding.",
    "Experiments: scaling curves under data and parameter sweeps."
  ]
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const url: string | undefined = body?.url;

    let paper: Paper;

    if (!url) {
      paper = MOCK_PAPER;
    } else if (!isArxivUrl(url)) {
      return NextResponse.json(
        { error: "请输入有效的 arXiv 链接，例如 https://arxiv.org/abs/2406.12345" },
        { status: 400 }
      );
    } else if (shouldUseMock()) {
      paper = { ...MOCK_PAPER, url };
    } else {
      paper = await fetchPaperFromArxiv(url);
    }

    const result = await generateEpisodeFromPaper(paper);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "生成失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
