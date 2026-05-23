# PaperCast · 论文电台

> 让最新的 AI 论文，变成 8 分钟可以听完的双人对话播客。

PaperCast 是一个 AI 论文播客生成平台。粘贴一个 arXiv 链接，几分钟后你就能拿到一集由两位 AI 主播完整讲解的播客，包含**对话脚本**、**封面图**、**双人合成音频**、**带时间戳的文字稿**。

中文学术圈追前沿论文有一个普遍的痛点 —— 英文 PDF 阅读门槛高、时间成本大，而每天通勤、跑步、做饭这些碎片时间，很适合用来"听"。让追论文这件事从「打开 PDF」变成「戴上耳机」，是 PaperCast 想做的全部。

---

## 产品特性

- **一键生成**：粘贴 arXiv 链接，AI 自动产出整集播客
- **双人对话**：主持人 Lin（好奇、提问代入听众）+ 嘉宾 Wei（领域专家、用类比解释）
- **可读 + 可听**：每集附带带时间戳的双人文字稿
- **统一视觉**：每集自动生成风格一致的封面图
- **多种风格**：轻松对谈 / 深度拆解 / 入门友好

## 内置示例

仓库内置 3 集示例播客：

- **EP001** — DeepSeek-V3 技术报告解读
- **EP002** — Mamba：状态空间模型如何挑战 Transformer
- **EP003** — Attention Is All You Need：Transformer 如何改变一切

每一集都包含完整的对话脚本与封面图（见 `lib/data/episodes.ts` 与 `public/samples/`）。

---

## 技术栈

- **Next.js 14（App Router）+ TypeScript** —— 前后端一体
- **Tailwind CSS** —— 视觉系统
- **大模型 API** —— 推理（长文本理解 + 脚本生成）、文生图（封面）、语音合成（双人 TTS）

三条能力在一条链路中协作：论文解析 → 对话脚本 → 封面图 → 双人音频，中间无需在不同供应商之间拼接。

---

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 配置 .env.local
cp .env.example .env.local
#   LLM_API_KEY=...
#   LLM_USE_MOCK=true   # 本地开发用 mock，不消耗 token

# 3. 启动
pnpm dev
# → http://localhost:3000
```

把 `LLM_USE_MOCK` 设为 `false` 即可切换到真实 API 调用。

---

## 项目结构

```
papercast/
├── app/                  # Next.js App Router 页面与 API
│   ├── page.tsx          # 首页：精选播客
│   ├── episodes/[id]/    # 详情页：播放器 + 文字稿
│   ├── generate/         # 生成页：粘贴 arXiv 链接
│   └── api/              # 后端 routes
├── components/           # UI 组件
├── lib/
│   ├── models.ts         # 大模型三种能力的封装
│   ├── prompts.ts        # 脚本/封面 prompt 模板
│   ├── arxiv.ts          # arXiv 链接解析
│   ├── types.ts
│   └── data/episodes.ts  # 示例数据
└── public/samples/       # 示例封面 SVG
```

---

## 路线图

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
