import type { Paper } from "@/lib/types";

const fallbackExcerpts = [
  "Introduction: explain the motivation and why prior methods are insufficient.",
  "Method: describe the core architecture, data flow, or algorithmic novelty.",
  "Experiments: summarize the strongest evidence and any notable ablations."
];

export function buildScriptPrompt(paper: Paper) {
  const excerpts = (paper.excerpts?.length ? paper.excerpts : fallbackExcerpts)
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");

  return `你是一档 AI 论文播客的脚本编辑。请基于下方论文，写一段 8-12 分钟、两位主播自然交谈的中文播客脚本。\n\n主播设定：\n- Lin：女声主持人，好奇、代入听众提出问题\n- Wei：男声嘉宾，领域专家，擅长类比解释\n\n输出要求：\n- 只返回 JSON 数组\n- 每一项格式为 { \"speaker\": \"host\" | \"guest\", \"text\": string }\n- 不要 markdown，不要代码块，不要额外说明\n- 结构需覆盖：研究问题、核心方法、实验亮点、局限与展望\n- 专业术语首次出现时，用一句口语化解释补充\n- 语气自然，像真实播客，不要像论文摘要复述\n\n论文标题：${paper.title}\n论文作者：${paper.authors.join("、")}\n论文摘要：${paper.abstract}\n关键章节摘录：\n${excerpts}`;
}

export function buildCoverPrompt(paper: Paper) {
  return `请为一档 AI 论文播客生成封面概念图描述。\n\n论文标题：${paper.title}\n论文摘要：${paper.abstract}\n\n要求：\n- 中文输出\n- 80 字以内\n- 风格：极简几何、莫兰迪色调、出版物海报、科技感、留白\n- 输出内容仅描述画面，不要解释`;
}
