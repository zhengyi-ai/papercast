import Link from "next/link";
import { ArrowRight, Headphones, Sparkles } from "lucide-react";
import { EpisodeCard } from "@/components/EpisodeCard";
import { episodes } from "@/lib/data/episodes";

export default function HomePage() {
  const featured = episodes.find((item) => item.featured) ?? episodes[0];
  const others = episodes.filter((item) => item.id !== featured.id);

  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-3xl border border-ink-100 bg-white p-10 shadow-soft md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
            <Sparkles size={12} /> 由 Xiaomi MiMo V2.5 驱动
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink-900">
            让最新的 AI 论文，
            <br />
            变成 8 分钟可以听完的双人对话播客。
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-600">
            粘贴一个 arXiv 链接，PaperCast 会用 MiMo V2.5 的推理、文生图与 TTS 三种能力，自动生成对话脚本、封面图与双人音频，让你在通勤路上就能追到最新的研究进展。
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent"
            >
              <Sparkles size={14} /> 立即生成
            </Link>
            <Link
              href={`/episodes/${featured.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-5 py-2.5 text-sm font-medium text-ink-800 transition hover:border-ink-200"
            >
              <Headphones size={14} /> 听一集精选
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink-100">
          <img src={featured.coverUrl} alt={featured.title} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-ink-900">本周精选</h2>
            <p className="mt-1 text-sm text-ink-600">
              编辑部精选三集示例，覆盖 LLM、模型架构、自家 MiMo V2.5。
            </p>
          </div>
          <Link
            href="/generate"
            className="inline-flex items-center gap-1 text-sm text-ink-600 transition hover:text-accent"
          >
            生成你想听的论文 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <EpisodeCard episode={featured} />
          {others.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-ink-100 bg-white/60 p-8 text-sm text-ink-600">
        <h3 className="text-base font-semibold text-ink-900">即将上线</h3>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          <li>· 周更内容运营，覆盖 LLM / 视觉 / 强化学习 / 系统</li>
          <li>· 用户上传任意 PDF 生成专属播客</li>
          <li>· 多语言：英文 / 日文版 host / guest 配音</li>
          <li>· RSS 订阅，可在小宇宙 / Apple Podcast 收听</li>
        </ul>
      </section>
    </div>
  );
}
