import type { Paper } from "@/lib/types";

const ARXIV_ABS_RE = /arxiv\.org\/abs\/([\w.-/]+)/i;
const ARXIV_PDF_RE = /arxiv\.org\/pdf\/([\w.-/]+)(\.pdf)?/i;

function normalizeArxivId(url: string) {
  const absMatch = url.match(ARXIV_ABS_RE);
  if (absMatch?.[1]) return absMatch[1].replace(/v\d+$/, "");

  const pdfMatch = url.match(ARXIV_PDF_RE);
  if (pdfMatch?.[1]) return pdfMatch[1].replace(/v\d+$/, "");

  return null;
}

export function isArxivUrl(url: string) {
  return Boolean(normalizeArxivId(url));
}

export async function fetchPaperFromArxiv(url: string): Promise<Paper> {
  const arxivId = normalizeArxivId(url);

  if (!arxivId) {
    throw new Error("请输入有效的 arXiv 链接。");
  }

  const response = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(arxivId)}`, {
    headers: {
      Accept: "application/atom+xml"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("获取 arXiv 元信息失败，请稍后重试。");
  }

  const xml = await response.text();

  const title = xml.match(/<title>([\s\S]*?)<\/title>/g)?.[1] ?? "";
  const titleMatches = [...xml.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((match) => match[1].trim());
  const summaryMatch = xml.match(/<summary>([\s\S]*?)<\/summary>/);
  const authorMatches = [...xml.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((match) => match[1].trim());
  const publishedMatch = xml.match(/<published>([\s\S]*?)<\/published>/);

  const paperTitle = titleMatches[1]?.replace(/\s+/g, " ") || title.replace(/\s+/g, " ").trim();
  const abstract = summaryMatch?.[1]?.replace(/\s+/g, " ").trim();

  if (!paperTitle || !abstract) {
    throw new Error("解析 arXiv 元信息失败，请尝试另一篇论文。");
  }

  return {
    title: paperTitle,
    abstract,
    authors: authorMatches,
    url: `https://arxiv.org/abs/${arxivId}`,
    publishedAt: publishedMatch?.[1],
    excerpts: [
      "Introduction: motivation, task definition, and why the problem matters.",
      "Method: the key architectural or algorithmic idea that differentiates the work.",
      "Experiments: the strongest quantitative or qualitative evidence supporting the claims."
    ]
  };
}
