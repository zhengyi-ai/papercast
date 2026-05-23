"use client";

import { useEffect, useState } from "react";
import { Check, FileSearch, Image as ImageIcon, Loader2, Mic, Sparkles } from "lucide-react";

type State = "idle" | "running" | "done";

type Props = {
  state: State;
};

const STEPS = [
  { id: "fetch-paper", label: "解析 arXiv 元信息", description: "拿到论文标题、摘要、作者", icon: FileSearch },
  { id: "generate-script", label: "生成双人对话脚本", description: "AI 推理模型写出 8-12 分钟脚本", icon: Sparkles },
  { id: "generate-cover", label: "生成播客封面", description: "AI 文生图模型产出封面", icon: ImageIcon },
  { id: "synthesize-audio", label: "合成双人音频", description: "AI 语音合成主播 / 嘉宾双音色", icon: Mic }
];

export function GenerateProgress({ state }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (state === "idle") {
      setStep(0);
      return;
    }
    if (state === "done") {
      setStep(STEPS.length);
      return;
    }
    setStep(0);
    const timer = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 900);
    return () => clearInterval(timer);
  }, [state]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
      <h3 className="text-sm font-semibold text-ink-900">生成进度</h3>
      <ol className="mt-5 space-y-4">
        {STEPS.map((item, index) => {
          const Icon = item.icon;
          const isActive = state !== "idle" && index === step && state !== "done";
          const isDone = state === "done" || index < step;

          return (
            <li key={item.id} className="flex gap-3">
              <span
                className={
                  isDone
                    ? "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white"
                    : isActive
                      ? "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
                      : "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400"
                }
              >
                {isDone ? (
                  <Check size={14} />
                ) : isActive ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Icon size={14} />
                )}
              </span>
              <div>
                <div className="text-sm font-medium text-ink-900">{item.label}</div>
                <p className="text-xs text-ink-400">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
