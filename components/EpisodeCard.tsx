import Link from "next/link";
import { Clock } from "lucide-react";
import type { Episode } from "@/lib/types";

type Props = {
  episode: Episode;
};

export function EpisodeCard({ episode }: Props) {
  return (
    <Link
      href={`/episodes/${episode.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-ink-50">
        <img
          src={episode.coverUrl}
          alt={episode.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {episode.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink-100 bg-ink-50 px-2 py-0.5 text-xs text-ink-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-ink-900">{episode.title}</h3>
        <p className="text-sm leading-relaxed text-ink-600 line-clamp-3">{episode.summary}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-ink-400">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {episode.duration}
          </span>
          <span className="text-ink-600 transition group-hover:text-accent">收听 →</span>
        </div>
      </div>
    </Link>
  );
}
