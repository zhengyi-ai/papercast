export type Speaker = "host" | "guest";

export type Segment = {
  speaker: Speaker;
  text: string;
};

export type TranscriptCue = {
  time: string;
  speaker: string;
  text: string;
};

export type Paper = {
  title: string;
  abstract: string;
  authors: string[];
  url: string;
  publishedAt?: string;
  excerpts?: string[];
};

export type Episode = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  publishedAt: string;
  tags: string[];
  paper: Paper;
  script: Segment[];
  transcript: TranscriptCue[];
  featured?: boolean;
};

export type GenerationStep =
  | "idle"
  | "fetch-paper"
  | "generate-script"
  | "generate-cover"
  | "synthesize-audio"
  | "done";

export type GenerateEpisodeInput = {
  url: string;
};

export type GenerateEpisodeResult = {
  episode: Episode;
  mode: "mock" | "live";
  steps: Array<{
    id: Exclude<GenerationStep, "idle">;
    label: string;
    status: "completed";
  }>;
};

export type ScriptResponse = {
  segments: Segment[];
};
