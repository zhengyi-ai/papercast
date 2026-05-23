import Link from "next/link";
import { Headphones, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-ink-100 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-white">
            <Headphones size={16} />
          </span>
          <span className="font-semibold tracking-tight">PaperCast</span>
          <span className="text-xs text-ink-400">· 论文电台</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-600">
          <Link href="/" className="transition hover:text-ink-900">
            精选
          </Link>
          <Link
            href="/generate"
            className="flex items-center gap-1 rounded-full bg-ink-900 px-4 py-1.5 text-white transition hover:bg-ink-800"
          >
            <Sparkles size={14} />
            生成播客
          </Link>
        </nav>
      </div>
    </header>
  );
}
