import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaperCast · 论文电台",
  description: "由 Xiaomi MiMo V2.5 驱动的 AI 论文播客生成平台。",
  metadataBase: new URL("https://papercast.example.com")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans">
        <Header />
        <main className="mx-auto max-w-5xl px-6 pb-24 pt-10">{children}</main>
        <footer className="border-t border-ink-100 bg-white py-8 text-center text-xs text-ink-400">
          PaperCast · 由 MiMo V2.5 驱动 · 内容仅供学习参考
        </footer>
      </body>
    </html>
  );
}
