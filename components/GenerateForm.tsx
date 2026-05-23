"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { GenerateEpisodeResult } from "@/lib/types";

type Props = {
  onSuccess: (result: GenerateEpisodeResult) => void;
  onStart: () => void;
};

const STYLE_OPTIONS = [
  { value: "casual", label: "轻松对谈" },
  { value: "deep-dive", label: "深度拆解" },
  { value: "beginner", label: "入门友好" }
];

export function GenerateForm({ onSuccess, onStart }: Props) {
  const [url, setUrl] = useState("");
  const [style, setStyle] = useState("casual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    onStart();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, style })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "生成失败，请稍后重试。");
      }

      onSuccess(data as GenerateEpisodeResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : "生成失败";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
      <label className="block text-sm font-medium text-ink-900">arXiv 链接</label>
      <input
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://arxiv.org/abs/2406.12345"
        className="mt-2 w-full rounded-xl border border-ink-100 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-accent focus:bg-white"
      />
      <p className="mt-1 text-xs text-ink-400">支持 arXiv abs / pdf 链接，留空则用示例论文。</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-ink-900">脚本风格</span>
        {STYLE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStyle(option.value)}
            className={
              style === option.value
                ? "rounded-full bg-ink-900 px-3 py-1 text-xs text-white"
                : "rounded-full border border-ink-100 bg-white px-3 py-1 text-xs text-ink-600 transition hover:border-ink-200"
            }
          >
            {option.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 py-3 text-sm font-medium text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
        {loading ? "生成中…" : "开始生成播客"}
      </button>
    </form>
  );
}
