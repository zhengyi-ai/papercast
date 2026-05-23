import { buildCoverPrompt, buildScriptPrompt } from "@/lib/prompts";
import type { Episode, GenerateEpisodeResult, ScriptResponse, Paper, Segment, TranscriptCue } from "@/lib/types";

const LLM_BASE_URL = process.env.LLM_BASE_URL || "https://api.example.com";
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_MODEL_REASON = process.env.LLM_MODEL_REASON || "reason-model";
const LLM_MODEL_VISION = process.env.LLM_MODEL_VISION || "vision-model";
const LLM_MODEL_TTS = process.env.LLM_MODEL_TTS || "tts-model";
const LLM_VOICE_HOST = process.env.LLM_VOICE_HOST || "voice-host-female";
const LLM_VOICE_GUEST = process.env.LLM_VOICE_GUEST || "voice-guest-male";

export function shouldUseMock() {
  return process.env.LLM_USE_MOCK !== "false" || !LLM_API_KEY;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function createTranscript(script: Segment[]): TranscriptCue[] {
  let totalSeconds = 0;

  return script.map((segment) => {
    const cue = {
      time: new Date(totalSeconds * 1000).toISOString().slice(14, 19),
      speaker: segment.speaker === "host" ? "Lin" : "Wei",
      text: segment.text
    };

    totalSeconds += Math.max(12, Math.round(segment.text.length / 4));
    return cue;
  });
}

function createEpisodeFromPaper(paper: Paper, script: Segment[], coverUrl: string, audioUrl: string): Episode {
  const summary = script.slice(0, 3).map((item) => item.text).join("");

  return {
    id: `generated-${Date.now()}`,
    slug: slugify(paper.title),
    title: paper.title,
    subtitle: "AI 主播带你听懂这篇论文的核心问题、方法与实验。",
    summary: `${summary.slice(0, 140)}${summary.length > 140 ? "…" : ""}`,
    duration: "10 分钟",
    coverUrl,
    audioUrl,
    publishedAt: new Date().toISOString(),
    tags: ["AI", "arXiv"],
    paper,
    script,
    transcript: createTranscript(script)
  };
}

function mockScript(paper: Paper): Segment[] {
  return [
    {
      speaker: "host",
      text: `今天我们来聊一篇最近很受关注的论文《${paper.title}》。如果你只想知道一句话版，这篇工作试图解决的是：为什么现有方法在规模变大后仍然效率不够高。`
    },
    {
      speaker: "guest",
      text: "对，这篇论文的切入点很典型：作者不是简单堆参数，而是重新审视系统里最贵的那一步，看看能不能把它换成更省资源、但表达力还够强的结构。"
    },
    {
      speaker: "host",
      text: "如果把它翻成更口语的话，就是作者在问：我们能不能用更聪明的方式理解长上下文，而不是每次都老老实实把所有位置两两比较一遍。"
    },
    {
      speaker: "guest",
      text: "方法上最值得注意的是，它把核心计算拆成了几个更可控的模块。你可以把它理解成把一台大型机器改造成流水线，每个环节都更专注，因此整体吞吐量更高。"
    },
    {
      speaker: "host",
      text: "那实验部分呢？很多听众会关心，这到底只是理论上更优雅，还是真的跑得更快。"
    },
    {
      speaker: "guest",
      text: "实验通常会给出两个层面的证据：第一是和主流 baseline 比，精度没掉甚至更好；第二是延迟、显存或吞吐量明显改善。对实际工程落地来说，第二点往往更有杀伤力。"
    },
    {
      speaker: "host",
      text: "我觉得这类论文最容易被忽略的是局限。比如它可能在某些长序列任务上特别强，但一旦换到别的分布，或者需要更复杂的多模态对齐时，优势就不一定还能保持。"
    },
    {
      speaker: "guest",
      text: "没错，所以更稳妥的结论不是'它会彻底取代旧范式'，而是它证明了一条很有前景的新方向：未来的大模型架构，未必只有一种主流答案。"
    }
  ];
}

async function postJson(path: string, body: unknown) {
  const response = await fetch(`${LLM_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`API 调用失败：${response.status}`);
  }

  return response.json();
}

export async function generateScript(paper: Paper): Promise<Segment[]> {
  if (shouldUseMock()) {
    return mockScript(paper);
  }

  const prompt = buildScriptPrompt(paper);
  const data = await postJson("/v1/chat/completions", {
    model: LLM_MODEL_REASON,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You produce podcast scripts as strict JSON."
      },
      {
        role: "user",
        content: `${prompt}\n\n请返回 { "segments": [...] }`
      }
    ]
  });

  const raw = data?.choices?.[0]?.message?.content;
  const parsed = typeof raw === "string" ? JSON.parse(raw) as ScriptResponse : raw;

  if (!parsed?.segments?.length) {
    throw new Error("模型没有返回有效脚本。");
  }

  return parsed.segments;
}

export async function generateCover(paper: Paper): Promise<string> {
  if (shouldUseMock()) {
    return "/samples/ep-generated.svg";
  }

  const prompt = buildCoverPrompt(paper);
  const data = await postJson("/v1/images/generations", {
    model: LLM_MODEL_VISION,
    prompt,
    size: "1024x1024"
  });

  const imageUrl = data?.data?.[0]?.url;

  if (!imageUrl) {
    throw new Error("模型没有返回封面图片。");
  }

  return imageUrl;
}

export async function synthesizeAudio(script: Segment[]): Promise<string> {
  if (shouldUseMock()) {
    return "/samples/mock-audio.mp3";
  }

  const clips = await Promise.all(
    script.map(async (segment) => {
      const data = await postJson("/v1/audio/speech", {
        model: LLM_MODEL_TTS,
        voice: segment.speaker === "host" ? LLM_VOICE_HOST : LLM_VOICE_GUEST,
        input: segment.text,
        format: "mp3"
      });

      return data?.url as string;
    })
  );

  return clips[0] || "/samples/mock-audio.mp3";
}

export async function generateEpisodeFromPaper(paper: Paper): Promise<GenerateEpisodeResult> {
  const script = await generateScript(paper);
  const coverUrl = await generateCover(paper);
  const audioUrl = await synthesizeAudio(script);

  return {
    mode: shouldUseMock() ? "mock" : "live",
    episode: createEpisodeFromPaper(paper, script, coverUrl, audioUrl),
    steps: [
      { id: "fetch-paper", label: "解析论文元信息", status: "completed" },
      { id: "generate-script", label: "生成双人对话脚本", status: "completed" },
      { id: "generate-cover", label: "生成播客封面", status: "completed" },
      { id: "synthesize-audio", label: "合成双人音频", status: "completed" },
      { id: "done", label: "生成完成", status: "completed" }
    ]
  };
}
