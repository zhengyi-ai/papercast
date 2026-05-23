import type { TranscriptCue } from "@/lib/types";

type Props = {
  cues: TranscriptCue[];
};

export function TranscriptViewer({ cues }: Props) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-900">文字稿</h3>
        <span className="text-xs text-ink-400">由 MiMo V2.5 Reason 生成</span>
      </div>
      <ol className="space-y-4">
        {cues.map((cue, index) => {
          const isHost = cue.speaker === "Lin";
          return (
            <li key={`${cue.time}-${index}`} className="flex gap-3 text-sm leading-relaxed">
              <span className="w-12 shrink-0 font-mono text-xs text-ink-400">{cue.time}</span>
              <span
                className={
                  isHost
                    ? "shrink-0 rounded-full bg-host/10 px-2 py-0.5 text-xs font-medium text-host"
                    : "shrink-0 rounded-full bg-guest/10 px-2 py-0.5 text-xs font-medium text-guest"
                }
              >
                {cue.speaker}
              </span>
              <p className="text-ink-800">{cue.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
