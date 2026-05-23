"use client";

import { useState } from "react";
import { GenerateForm } from "@/components/GenerateForm";
import { GenerateProgress } from "@/components/GenerateProgress";
import { AudioPlayer } from "@/components/AudioPlayer";
import { TranscriptViewer } from "@/components/TranscriptViewer";
import type { GenerateEpisodeResult } from "@/lib/types";

type State = "idle" | "running" | "done";

export default function GeneratePage() {
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<GenerateEpisodeResult | null>(null);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900">生成你的论文播客</h1>
        <p className="text-sm leading-relaxed text-ink-600">
          粘贴 arXiv 链接，PaperCast 会依次完成解析、脚本、封面与双人配音四个步骤。当前为 mock 模式：流程完整可见，不消耗 token。
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <GenerateForm
          onStart={() => {
            setState("running");
            setResult(null);
          }}
          onSuccess={(data) => {
            setResult(data);
            setState("done");
          }}
        />
        <GenerateProgress state={state} />
      </div>

      {result && (
        <section className="space-y-6">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ink-900">{result.episode.title}</h2>
                <p className="mt-1 text-sm text-ink-600">{result.episode.summary}</p>
              </div>
              <span
                className={
                  result.mode === "live"
                    ? "rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                    : "rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-600"
                }
              >
                {result.mode === "live" ? "AI 实时生成" : "Mock 演示模式"}
              </span>
            </div>
          </div>

          <AudioPlayer src={result.episode.audioUrl} title={result.episode.title} />
          <TranscriptViewer cues={result.episode.transcript} />
        </section>
      )}
    </div>
  );
}
