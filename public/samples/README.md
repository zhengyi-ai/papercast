# public/samples

这个目录存放 PaperCast 的示例素材，用于在 mock 模式下让首页与详情页可以直接渲染。

## 文件清单

| 文件 | 用途 |
| --- | --- |
| `ep001.svg` | EP001 DeepSeek-V3 封面 |
| `ep002.svg` | EP002 Mamba 封面 |
| `ep003.svg` | EP003 MiMo V2.5 封面 |
| `ep-generated.svg` | 生成页 mock 模式下的封面占位 |
| `mock-audio.mp3` | 音频占位（生产环境由 MiMo TTS 实时生成） |

> `mock-audio.mp3` 出于体积考虑未直接提交到仓库。在本地开发时可以放任意一段 MP3 或保持空文件，播放器在 mock 模式下不影响其他流程展示。

## 生产环境替换说明

- 封面图：由 `lib/mimo.ts → generateCover` 调用 `mimo-v2.5-vision` 生成，URL 由 MiMo CDN 直接给出。
- 音频文件：由 `lib/mimo.ts → synthesizeAudio` 调用 `mimo-v2.5-tts` 生成，长音频由 ffmpeg 串接后上传到对象存储。

切换到真实 MiMo API 只需要：

```bash
# .env.local
MIMO_API_KEY=...
MIMO_USE_MOCK=false
```

之后 `public/samples/` 仅作为离线备份保留。
