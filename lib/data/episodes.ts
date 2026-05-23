import type { Episode } from "@/lib/types";

export const episodes: Episode[] = [
  {
    id: "ep001",
    slug: "deepseek-v3-tech-report",
    title: "DeepSeek-V3 技术报告解读",
    subtitle: "为什么说这篇报告不只是参数规模的胜利，而是训练与系统协同的样板。",
    summary: "Lin 和 Wei 拆解 DeepSeek-V3 的训练策略、MoE 路线与工程取舍，解释这篇报告为什么会在中文技术圈引发持续讨论。",
    duration: "11 分钟",
    coverUrl: "/samples/ep001.svg",
    audioUrl: "/samples/mock-audio.mp3",
    publishedAt: "2026-05-01T08:00:00.000Z",
    featured: true,
    tags: ["LLM", "MoE", "DeepSeek"],
    paper: {
      title: "DeepSeek-V3 Technical Report",
      abstract: "We present DeepSeek-V3, a frontier MoE language model with strong efficiency and multilingual reasoning performance.",
      authors: ["DeepSeek Team"],
      url: "https://arxiv.org/abs/2412.19437"
    },
    script: [
      { speaker: "host", text: "今天这集我们来聊 DeepSeek-V3 技术报告。很多人第一眼会被参数规模吸引，但我觉得更值得听的是，它怎么把训练效率和模型能力一起往上推。" },
      { speaker: "guest", text: "对，这篇报告真正的重点不是‘更大’，而是‘更会组织资源’。MoE 结构本来就强调按需激活，DeepSeek-V3 做的是把这个思路推进到工程上也站得住的程度。" },
      { speaker: "host", text: "如果听众以前没接触过 MoE，可以把它想成一个很大的专家团队。每次回答问题，不是所有专家一起上，而是先分诊，再让最相关的几位出面。" },
      { speaker: "guest", text: "这个类比很贴切。这样做的好处是，总参数量可以非常大，但每个 token 真正消耗的计算量不会等比例暴涨，所以训练和推理都更有机会控住成本。" },
      { speaker: "host", text: "但 MoE 也有老问题，比如路由不均匀、某些专家过载、训练容易不稳定。DeepSeek-V3 这篇报告里，作者其实花了大量篇幅去讲这些细节怎么被收敛到可控区间。" },
      { speaker: "guest", text: "没错。很多外行看大模型报告只盯 benchmark，但真正做系统的人会先看训练稳定性、吞吐量、并行策略和通信开销，因为这些决定了这条路线能不能复制。" },
      { speaker: "host", text: "也就是说，这篇报告提供的不只是一个成绩单，更像是一份操作手册：如果你也想训练一个大规模 MoE 模型，你至少知道哪些坑一定会踩。" },
      { speaker: "guest", text: "对，而且它的实验叙事也很聪明，不只是说‘我更强’，而是尽量证明‘我是在更高效率下更强’。这会让工业界特别有感觉，因为算力预算永远是真约束。" },
      { speaker: "host", text: "我还注意到一个细节：这类模型一旦上下文变长，系统层面的瓶颈会比算法本身更快冒出来。也就是说，训练和服务其实是一体两面的设计题。" },
      { speaker: "guest", text: "所以 DeepSeek-V3 的意义不只是单一模型表现，而是它展示了中国团队在大模型工程化上的组织能力。对听众来说，最值得学的是这种‘算法与基础设施一起设计’的思路。" }
    ],
    transcript: [
      { time: "00:00", speaker: "Lin", text: "今天这集我们来聊 DeepSeek-V3 技术报告。很多人第一眼会被参数规模吸引，但我觉得更值得听的是，它怎么把训练效率和模型能力一起往上推。" },
      { time: "00:32", speaker: "Wei", text: "对，这篇报告真正的重点不是‘更大’，而是‘更会组织资源’。MoE 结构本来就强调按需激活，DeepSeek-V3 做的是把这个思路推进到工程上也站得住的程度。" },
      { time: "01:06", speaker: "Lin", text: "如果听众以前没接触过 MoE，可以把它想成一个很大的专家团队。每次回答问题，不是所有专家一起上，而是先分诊，再让最相关的几位出面。" },
      { time: "01:38", speaker: "Wei", text: "这个类比很贴切。这样做的好处是，总参数量可以非常大，但每个 token 真正消耗的计算量不会等比例暴涨，所以训练和推理都更有机会控住成本。" },
      { time: "02:11", speaker: "Lin", text: "但 MoE 也有老问题，比如路由不均匀、某些专家过载、训练容易不稳定。DeepSeek-V3 这篇报告里，作者其实花了大量篇幅去讲这些细节怎么被收敛到可控区间。" },
      { time: "02:47", speaker: "Wei", text: "没错。很多外行看大模型报告只盯 benchmark，但真正做系统的人会先看训练稳定性、吞吐量、并行策略和通信开销，因为这些决定了这条路线能不能复制。" },
      { time: "03:23", speaker: "Lin", text: "也就是说，这篇报告提供的不只是一个成绩单，更像是一份操作手册：如果你也想训练一个大规模 MoE 模型，你至少知道哪些坑一定会踩。" },
      { time: "03:57", speaker: "Wei", text: "对，而且它的实验叙事也很聪明，不只是说‘我更强’，而是尽量证明‘我是在更高效率下更强’。这会让工业界特别有感觉，因为算力预算永远是真约束。" },
      { time: "04:30", speaker: "Lin", text: "我还注意到一个细节：这类模型一旦上下文变长，系统层面的瓶颈会比算法本身更快冒出来。也就是说，训练和服务其实是一体两面的设计题。" },
      { time: "05:03", speaker: "Wei", text: "所以 DeepSeek-V3 的意义不只是单一模型表现，而是它展示了中国团队在大模型工程化上的组织能力。对听众来说，最值得学的是这种‘算法与基础设施一起设计’的思路。" }
    ]
  },
  {
    id: "ep002",
    slug: "mamba-state-space-models",
    title: "Mamba：状态空间模型如何挑战 Transformer",
    subtitle: "不靠全局注意力，怎么把长序列建模这件事重新做一遍？",
    summary: "这一集从直觉层面解释 Mamba 的状态空间路线，为什么它会在长上下文效率上击中大家的痛点。",
    duration: "9 分钟",
    coverUrl: "/samples/ep002.svg",
    audioUrl: "/samples/mock-audio.mp3",
    publishedAt: "2026-05-05T08:00:00.000Z",
    tags: ["Architecture", "Mamba", "Sequence Modeling"],
    paper: {
      title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
      abstract: "Mamba introduces a selective state space model that matches strong sequence modeling quality while scaling linearly with sequence length.",
      authors: ["Albert Gu", "Tri Dao"],
      url: "https://arxiv.org/abs/2312.00752"
    },
    script: [
      { speaker: "host", text: "今天这篇论文很有意思，因为它提出的不是 Transformer 的小修小补，而是另一条理解长序列的路线：Mamba。" },
      { speaker: "guest", text: "对，Mamba 的吸引力在于它试图摆脱注意力机制那种随着序列长度上涨而越来越贵的计算方式，用线性时间去处理更长的上下文。" },
      { speaker: "host", text: "如果把 Transformer 想成开会时每个人都要看所有人发言，Mamba 更像是会场里有一个不断更新的记事员，他把最关键的信息压缩进内部状态里。" },
      { speaker: "guest", text: "这个比喻很有帮助。状态空间模型其实不是新东西，但以前常见的问题是表达能力不够灵活。Mamba 的关键创新，就是让模型学会有选择地更新记忆。" },
      { speaker: "host", text: "也就是说，它不是机械地把所有信息平均存起来，而是像一个会做重点笔记的人，知道哪些内容值得留下。" },
      { speaker: "guest", text: "没错，这就是论文里所谓 selective 的直觉。这个选择机制让它在保留效率优势的同时，也更接近现代大模型对复杂语义的需求。" },
      { speaker: "host", text: "那为什么这篇论文出来之后，大家会那么兴奋？我感觉一部分原因是，它不是只在理论上优雅，而是真的戳中了长上下文成本问题。" },
      { speaker: "guest", text: "是的。只要你做过长文本、长音频或者长时间序列，你都会遇到一个现实问题：上下文越长，注意力矩阵越难伺候。Mamba 正是在这个痛点上给出了有竞争力的替代方案。" },
      { speaker: "host", text: "当然，局限也要看见。它并不意味着 Transformer 马上过时，而是提醒我们：大模型架构仍然在剧烈演化，主流答案还没完全定型。" }
    ],
    transcript: [
      { time: "00:00", speaker: "Lin", text: "今天这篇论文很有意思，因为它提出的不是 Transformer 的小修小补，而是另一条理解长序列的路线：Mamba。" },
      { time: "00:27", speaker: "Wei", text: "对，Mamba 的吸引力在于它试图摆脱注意力机制那种随着序列长度上涨而越来越贵的计算方式，用线性时间去处理更长的上下文。" },
      { time: "00:59", speaker: "Lin", text: "如果把 Transformer 想成开会时每个人都要看所有人发言，Mamba 更像是会场里有一个不断更新的记事员，他把最关键的信息压缩进内部状态里。" },
      { time: "01:33", speaker: "Wei", text: "这个比喻很有帮助。状态空间模型其实不是新东西，但以前常见的问题是表达能力不够灵活。Mamba 的关键创新，就是让模型学会有选择地更新记忆。" },
      { time: "02:07", speaker: "Lin", text: "也就是说，它不是机械地把所有信息平均存起来，而是像一个会做重点笔记的人，知道哪些内容值得留下。" },
      { time: "02:33", speaker: "Wei", text: "没错，这就是论文里所谓 selective 的直觉。这个选择机制让它在保留效率优势的同时，也更接近现代大模型对复杂语义的需求。" },
      { time: "03:05", speaker: "Lin", text: "那为什么这篇论文出来之后，大家会那么兴奋？我感觉一部分原因是，它不是只在理论上优雅，而是真的戳中了长上下文成本问题。" },
      { time: "03:38", speaker: "Wei", text: "是的。只要你做过长文本、长音频或者长时间序列，你都会遇到一个现实问题：上下文越长，注意力矩阵越难伺候。Mamba 正是在这个痛点上给出了有竞争力的替代方案。" },
      { time: "04:13", speaker: "Lin", text: "当然，局限也要看见。它并不意味着 Transformer 马上过时，而是提醒我们：大模型架构仍然在剧烈演化，主流答案还没完全定型。" }
    ]
  },
  {
    id: "ep003",
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need：Transformer 是如何改变一切的",
    subtitle: "一篇 2017 年的论文，为什么至今仍是整个大模型时代的原点？",
    summary: "回到起点，Lin 和 Wei 拆解 Transformer 架构的四个关键词：自注意力、多头、位置编码、残差连接。",
    duration: "10 分钟",
    coverUrl: "/samples/ep003.svg",
    audioUrl: "/samples/mock-audio.mp3",
    publishedAt: "2026-05-08T08:00:00.000Z",
    tags: ["Architecture", "Transformer", "Attention"],
    paper: {
      title: "Attention Is All You Need",
      abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Łukasz Kaiser", "Illia Polosukhin"],
      url: "https://arxiv.org/abs/1706.03762"
    },
    script: [
      { speaker: "host", text: "今天这集我们要回到 2017 年，聊一篇改变了整个行业的论文：Attention Is All You Need。如果大模型是一座摩天大楼，这篇论文就是它的地基。" },
      { speaker: "guest", text: "没错。标题本身就是一句宣言：注意力机制就足够。不需要循环神经网络，不需要卷积，只需要一种全新的结构，靠’注意’来理解序列之间的关系。" },
      { speaker: "host", text: "对没接触过的听众，可以把注意力想成：读书时，你不是逐字读，而是自然地对关键词和上下文关系更敏感。Transformer 就是把这种’重点感知’变成了可训练的数学机制。" },
      { speaker: "guest", text: "而且它还做了’多头’：不是只看一种关系，而是同时用多个视角去理解同一段文本。有的头关注语法结构，有的关注语义距离，有的关注指代关系。" },
      { speaker: "host", text: "另一个巧妙的设计是位置编码。因为注意力本身不关心顺序，作者在输入里手工注入了位置信息，让模型知道’前面’和’后面’的区别。" },
      { speaker: "guest", text: "对，再加上残差连接和层归一化，让深层网络也能稳定训练。这四个设计组合起来，在当年的机器翻译任务上直接碾压了当时最好的 RNN 模型。" },
      { speaker: "host", text: "但我觉得这篇论文真正的贡献，不是翻译任务的表现，而是它提供了一个’可并行’的架构。RNN 必须一步一步处理序列，Transformer 可以同时看所有位置，训练效率天差地别。" },
      { speaker: "guest", text: "这就是为什么后来 GPT、BERT、T5 所有这些里程碑模型都基于 Transformer。它不一定是最优雅的理论，但它是最适合规模化训练的骨架。" },
      { speaker: "host", text: "局限也有：自注意力的计算量随序列长度平方增长，这也是后来 Mamba 这些新架构试图突破的方向。但回头看，2017 年的这八个作者提出的是一个真正经得起时间考验的方案。" }
    ],
    transcript: [
      { time: "00:00", speaker: "Lin", text: "今天这集我们要回到 2017 年，聊一篇改变了整个行业的论文：Attention Is All You Need。如果大模型是一座摩天大楼，这篇论文就是它的地基。" },
      { time: "00:30", speaker: "Wei", text: "没错。标题本身就是一句宣言：注意力机制就足够。不需要循环神经网络，不需要卷积，只需要一种全新的结构，靠’注意’来理解序列之间的关系。" },
      { time: "01:04", speaker: "Lin", text: "对没接触过的听众，可以把注意力想成：读书时，你不是逐字读，而是自然地对关键词和上下文关系更敏感。Transformer 就是把这种’重点感知’变成了可训练的数学机制。" },
      { time: "01:38", speaker: "Wei", text: "而且它还做了’多头’：不是只看一种关系，而是同时用多个视角去理解同一段文本。有的头关注语法结构，有的关注语义距离，有的关注指代关系。" },
      { time: "02:11", speaker: "Lin", text: "另一个巧妙的设计是位置编码。因为注意力本身不关心顺序，作者在输入里手工注入了位置信息，让模型知道’前面’和’后面’的区别。" },
      { time: "02:40", speaker: "Wei", text: "对，再加上残差连接和层归一化，让深层网络也能稳定训练。这四个设计组合起来，在当年的机器翻译任务上直接碾压了当时最好的 RNN 模型。" },
      { time: "03:15", speaker: "Lin", text: "但我觉得这篇论文真正的贡献，不是翻译任务的表现，而是它提供了一个’可并行’的架构。RNN 必须一步一步处理序列，Transformer 可以同时看所有位置，训练效率天差地别。" },
      { time: "03:52", speaker: "Wei", text: "这就是为什么后来 GPT、BERT、T5 所有这些里程碑模型都基于 Transformer。它不一定是最优雅的理论，但它是最适合规模化训练的骨架。" },
      { time: "04:28", speaker: "Lin", text: "局限也有：自注意力的计算量随序列长度平方增长，这也是后来 Mamba 这些新架构试图突破的方向。但回头看，2017 年的这八个作者提出的是一个真正经得起时间考验的方案。" }
    ]
  }
];

export function getEpisodeById(id: string) {
  return episodes.find((episode) => episode.id === id || episode.slug === id);
}
