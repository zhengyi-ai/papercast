import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaperCast · 论文电台",
  description: "AI 驱动的论文播客生成平台。粘贴 arXiv 链接，自动生成双人对话播客。",
  metadataBase: new URL("https://papercast.example.com")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans">
        <Header />
        <main className="mx-auto max-w-5xl px-6 pb-24 pt-10">{children}</main>
        <footer className="border-t border-ink-100 bg-white py-8 text-center text-xs text-ink-400">
          PaperCast · AI 论文播客 · 内容仅供学习参考
        </footer>
      </body>
    </html>
  );
}
