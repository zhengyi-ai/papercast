import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { TranscriptViewer } from "@/components/TranscriptViewer";
import { episodes } from "@/lib/data/episodes";

export function generateStaticParams() {
  return episodes.map((episode) => ({ id: episode.id }));
}

export default function EpisodePage({ params }: { params: { id: string } }) {
  const episode = episodes.find((item) => item.id === params.id || item.slug === params.id);

  if (!episode) {
    notFound();
  }

  const ep = episode!;

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-ink-600 transition hover:text-ink-900"
      >
        <ArrowLeft size={14} /> 返回精选
      </Link>

      <header className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
          <img src={ep.coverUrl} alt={ep.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {ep.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink-100 bg-white px-2 py-0.5 text-xs text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink-900">
            {ep.title}
          </h1>
          <p className="text-base leading-relaxed text-ink-600">{ep.subtitle}</p>

          <dl className="mt-2 space-y-2 text-sm text-ink-600">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-ink-400">论文</dt>
              <dd className="text-ink-800">{ep.paper.title}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-ink-400">作者</dt>
              <dd className="text-ink-800">{ep.paper.authors.join("、")}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-ink-400">链接</dt>
              <dd>
                <a
                  href={ep.paper.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  {ep.paper.url}
                  <ExternalLink size={12} />
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-ink-400">时长</dt>
              <dd className="text-ink-800">{ep.duration}</dd>
            </div>
          </dl>
        </div>
      </header>

      <AudioPlayer src={ep.audioUrl} title={ep.title} />

      <TranscriptViewer cues={ep.transcript} />
    </div>
  );
}
