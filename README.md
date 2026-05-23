# PaperCast · 论文电台

> 让最新的 AI 论文，变成 8 分钟可以听完的双人对话播客。

PaperCast 是一个 AI 论文播客生成平台。粘贴一个 arXiv 链接，几分钟后你就能拿到一集由两位 AI 主播完整讲解的播客，包含**对话脚本**、**封面图**、**双人合成音频**、**带时间戳的文字稿**。

我们想解决的问题很具体：中文学术圈追前沿论文有一个普遍的痛点 —— 英文 PDF 阅读门槛高、时间成本大，而每天通勤、跑步、做饭这些碎片时间，其实很适合用来"听"。**让追前沿论文这件事，从"打开 PDF"变成"戴上耳机"**，是 PaperCast 想做的全部。

---

## ✨ 产品特性

- **一键生成**：粘贴 arXiv 链接，AI 主播自动产出整集播客
- **双人对话**：主持人 Lin（好奇、提问代入听众）+ 嘉宾 Wei（领域专家、用类比解释）
- **可读 + 可听**：每集都附带带时间戳的双人文字稿
- **统一视觉**：每集都有风格一致的封面图
- **多种风格**：轻松对谈 / 深度拆解 / 入门友好，按需选择

---

## 🛠️ 技术栈

- **Next.js 14（App Router）+ TypeScript** —— 前后端一体
- **Tailwind CSS** —— 视觉系统
- **MiMo V2.5** —— 推理 / 多模态 / 语音合成

之所以选 MiMo V2.5，是因为它是少数同时具备「长文本推理 + 多模态生成 + 高保真 TTS」的统一平台。一篇论文的解读，从理解到出图再到配音，可以在一条链路里完成，不需要在多个供应商之间拼接，整集播客的风格、节奏和信息密度都更连贯。

| 阶段 | 能力 | 调用文件 |
| --- | --- | --- |
| 解析论文 + 生成对话脚本 | 长文本推理 / 角色扮演 | `lib/mimo.ts → generateScript` |
| 生成封面 | 多模态文生图 | `lib/mimo.ts → generateCover` |
| 双人 TTS | 多音色语音合成 | `lib/mimo.ts → synthesizeAudio` |

详细的调用流程、prompt 设计、token 预估见 [ARCHITECTURE.md](./ARCHITECTURE.md)。

---

## 🎧 内置示例

仓库内置 3 集示例播客，覆盖当下热门方向：

- **EP001** — DeepSeek-V3 技术报告解读（11 分钟）
- **EP002** — Mamba：状态空间模型如何挑战 Transformer（9 分钟）
- **EP003** — MiMo V2.5：多模态推理大模型（13 分钟）

每一集都包含完整的对话脚本与封面图（见 `lib/data/episodes.ts` 与 `public/samples/`）。

---

## 🚀 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 配置 .env.local
cp .env.example .env.local
#   MIMO_API_KEY=...
#   MIMO_USE_MOCK=true   # 本地开发用 mock，不消耗 token

# 3. 启动
pnpm dev
# → http://localhost:3000
```

把 `MIMO_USE_MOCK` 设为 `false` 即可切换到真实 API 调用。

---

## 📂 项目结构

```
papercast/
├── app/                  # Next.js App Router 页面与 API
│   ├── page.tsx          # 首页：精选播客
│   ├── episodes/[id]/    # 详情页：播放器 + 文字稿
│   ├── generate/         # 生成页：粘贴 arXiv 链接
│   └── api/              # 后端 routes
├── components/           # UI 组件
├── lib/
│   ├── mimo.ts           # MiMo V2.5 三种能力的封装
│   ├── prompts.ts        # 脚本/封面 prompt 模板
│   ├── arxiv.ts          # arXiv 链接解析
│   ├── types.ts
│   └── data/episodes.ts  # 示例数据
└── public/samples/       # 示例封面 SVG
```

---

## 🗺️ 路线图

详见 [ROADMAP.md](./ROADMAP.md)。当前阶段：

- [x] 端到端 MVP（mock 模式）
- [x] 三集示例播客脚本与封面
- [ ] 周更内容运营，目标每周 5-7 集
- [ ] 多语言支持（英文 / 日文 TTS）
- [ ] 用户上传任意 PDF 生成播客
- [ ] RSS 订阅，可在小宇宙 / Apple Podcast 收听

---

## License

MIT
