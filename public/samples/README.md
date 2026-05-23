# public/samples

示例素材目录，mock 模式下供首页与详情页直接渲染。

## 文件清单

| 文件 | 用途 |
| --- | --- |
| `ep001.svg` | EP001 DeepSeek-V3 封面 |
| `ep002.svg` | EP002 Mamba 封面 |
| `ep003.svg` | EP003 Attention Is All You Need 封面 |
| `ep-generated.svg` | 生成页 mock 模式下的封面占位 |
| `mock-audio.mp3` | 音频占位（生产环境由 TTS 实时生成） |

> `mock-audio.mp3` 出于体积考虑未直接提交。本地开发时可放任意 MP3，播放器在 mock 模式下不受影响。

## 生产环境替换

- 封面图：由 `lib/models.ts → generateCover` 调用文生图 API 生成
- 音频文件：由 `lib/models.ts → synthesizeAudio` 调用 TTS API 生成，长音频由 ffmpeg 串接后上传到对象存储

切换到真实 API：

```bash
# .env.local
LLM_API_KEY=...
LLM_USE_MOCK=false
```

之后 `public/samples/` 仅作为离线备份保留。
