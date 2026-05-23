"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Props = {
  src: string;
  title?: string;
};

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "00:00";
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function AudioPlayer({ src, title }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => undefined);
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seek(event: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Number(event.target.value);
    audio.currentTime = next;
    setProgress(next);
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition hover:bg-accent"
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="text-sm font-medium text-ink-900">{title ?? "PaperCast 播放器"}</div>
          <div className="mt-1 flex items-center gap-3 text-xs text-ink-400">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={seek}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-ink-100 accent-accent"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <Volume2 size={16} className="text-ink-400" />
      </div>
    </div>
  );
}
