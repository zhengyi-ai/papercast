# PaperCast · 论文电台

> 让最新的 AI 论文，变成 8 分钟可以听完的双人对话播客。

PaperCast 是一个由 [Xiaomi MiMo V2.5](https://100t.xiaomimimo.com/) 驱动的 AI 论文播客生成平台。粘贴一个 arXiv 链接，几分钟后你就能拿到一集由两位 AI 主播完整讲解的播客 —— 包含**对话脚本**、**封面图**、**双人合成音频**、**带时间戳的文字稿**。

我们想做的是 NotebookLM 在中文学术圈的对位产品，但聚焦一件事：**让追前沿论文这件事，从"打开 PDF"变成"通勤路上戴上耳机"**。

---

## ✨ 这个项目用到了 MiMo V2.5 的哪些能力？

PaperCast 的每一集播客，都会**完整调用 MiMo V2.5 的三种核心能力**，这也是我们申请百万亿 Token 计划的根本原因：

| 阶段 | 能力 | MiMo 模块 | 调用文件 |
| --- | --- | --- | --- |
| ① 解析论文 | 长文本推理 | `mimo-v2.5-reason` | `lib/mimo.ts → generateScript` |
| ② 生成对话脚本 | 角色扮演 + 长上下文推理 | `mimo-v2.5-reason` | `lib/mimo.ts → generateScript` |
| ③ 生成封面 | 多模态文生图 | `mimo-v2.5-vision` | `lib/mimo.ts → generateCover` |
| ④ 双人 TTS | 语音合成（多音色） | `mimo-v2.5-tts` | `lib/mimo.ts → synthesizeAudio` |

> 详细的调用流程、prompt 设计、token 预估见 [ARCHITECTURE.md](./ARCHITECTURE.md)。

---

## 🎧 截图与示例

```
┌─────────────────────────────────────────────────────────┐
│  PaperCast · 让论文听起来                                │
│  ─────────────────────                                   │
│   [ 立即生成 ]    [ 浏览本周精选 ]                       │
└─────────────────────────────────────────────────────────┘
```

仓库内置 3 集示例播客：

- **EP001** — DeepSeek-V3 技术报告解读（11 分钟）
- **EP002** — Mamba：状态空间模型如何挑战 Transformer（9 分钟）
- **EP003** — MiMo V2.5：小米的多模态推理大模型（13 分钟）

每一集都包含完整的对话脚本与封面图（见 `lib/data/episodes.ts` 与 `public/samples/`）。音频文件在生产环境由 MiMo TTS 实时生成，本仓库提供占位说明。

---

## 🛠️ 技术栈

- **Next.js 14（App Router）+ TypeScript** —— 前后端一体
- **Tailwind CSS** —— 视觉系统
- **MiMo V2.5 Open Platform** —— 推理 / 多模态 / TTS

无数据库依赖：示例数据通过文件常量提供；生成结果走 API route 即时返回。这一架构让我们可以**只关注模型调用本身**，把所有 token 都花在内容上。

---

## 🚀 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 配置 .env.local
cp .env.example .env.local
#   MIMO_API_KEY=...
#   MIMO_BASE_URL=https://api.xiaomimimo.com
#   MIMO_USE_MOCK=true   # 本地开发用 mock，不消耗 token

# 3. 启动
pnpm dev
# → http://localhost:3000
```

把 `MIMO_USE_MOCK` 设为 `false` 即可切换到真实 MiMo API 调用。

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
│   ├── mimo.ts           # ★ MiMo V2.5 三种能力的封装
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
- [ ] 接入 MiMo V2.5 真实 API（**待 Orbit 计划权益到账**）
- [ ] 周更内容运营，目标每周 5-7 集
- [ ] 多语言支持（英文 / 日文 TTS）
- [ ] 用户上传任意 PDF 生成播客

---

## 🤝 关于 Xiaomi MiMo Orbit 申请

PaperCast 是为 [百万亿 Token 创造者激励计划](https://100t.xiaomimimo.com/) 量身搭建的项目。我们对申请流程提交的「项目描述」「证明材料」两栏的成稿草案，见 [APPLICATION.md](./APPLICATION.md)。

---

## License

MIT
