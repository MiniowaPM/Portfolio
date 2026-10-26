<div align="center">

<img src="images/AE3D9803-84C7-4D6B-852E-91460DFD6ABC_1_105_c.jpeg" width="600" alt="ALEKSY Unit 01"/>

# ALEKSY — Unit 01

**Autonomous Local Encrypted Knowledge System Yield**

*A fully offline, privacy-first Polish voice assistant. Built from scratch. Runs on the edge.*

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Ollama](https://img.shields.io/badge/Ollama-local%20LLM-black?style=for-the-badge&logo=ollama)](https://ollama.com)
[![Platform](https://img.shields.io/badge/Platform-Jetson%20Xavier%20NX-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://developer.nvidia.com/embedded/jetson-xavier-nx)
[![Air Gapped](https://img.shields.io/badge/Network-Air--Gapped-red?style=for-the-badge&logo=shield&logoColor=white)]()

</div>

---

## Demo

[![Watch on YouTube](https://img.shields.io/badge/Watch%20on-YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/shorts/V51wDqSVl7A)

---

## What is it?

ALEKSY is a **fully offline** voice assistant that speaks Polish. Every stage of the pipeline — wake word detection, speech recognition, language model inference, and speech synthesis — runs entirely on-device. No cloud. No API keys. No data ever leaves the machine.

The goal was to build a voice assistant with a strong privacy guarantee: even if the device is compromised, there is nothing to intercept, because nothing is ever sent anywhere.

```
"Aleksy..."         →  wake word detected       →  "Tak?"
"Która godzina?"    →  "Chwileczkę..."
                    →  Whisper transcribes
                    →  Bielik answers via Ollama
                    →  Piper speaks the response
```

---

## The Hardware

<div align="center">
<img src="images/D0CD29D3-D425-4FB3-AE03-FA27D02A9D8A_1_105_c.jpeg" width="480" alt="ALEKSY front view"/>
</div>

ALEKSY runs on an **NVIDIA Jetson Xavier NX** — an edge AI board with a Volta GPU originally designed for robotics and computer vision workloads.

| Component | Spec |
|-----------|------|
| **Board** | NVIDIA Jetson Xavier NX (JetPack 5.1.3) |
| **CPU** | 6-core Carmel ARM v8.2 |
| **GPU** | Volta, 384 CUDA cores — used exclusively for LLM inference via Ollama |
| **Memory** | 8 GB LPDDR4x shared RAM/VRAM |
| **Microphone** | USB lavalier mic via C-Media USB audio adapter |
| **Speaker** | Dual stereo speakers, integrated into the enclosure |
| **Power** | USB-C powerbank — fully cordless operation |

> macOS (Apple Silicon) is supported as a **development environment** via the `--test` flag.

---

## The Enclosure

<div align="center">

| | |
|---|---|
| <img src="images/4F5DE9E1-F882-4036-898F-AE9BF2150DA5_1_105_c.jpeg" width="340" alt="ALEKSY back"/> | <img src="images/D2EF8F9A-7A64-4A06-9AFE-0A42453DE66D_1_105_c.jpeg" width="340" alt="ALEKSY side"/> |

</div>

Custom 3D-printed enclosure designed specifically for this project. PLA, printed in orange. Features ventilation grilles, integrated speaker mounts, cable management slot, and "A.L.E.K.S.Y. — UNIT 01" embossed on the front panel.

STL files and the original Rhino `.3dm` source are in [`3d case/`](3d%20case/).

---

## Pipeline

| Stage | Technology | Details |
|-------|-----------|---------|
| 🎧 **Wake word** | openWakeWord | `alexa` model, ONNX inference, single 16 kHz PyAudio stream |
| 🗣️ **Speech-to-text** | faster-whisper | `base` model, Polish, int8 CPU, VAD filter |
| 🧠 **LLM** | Ollama + Bielik | `bielik-q3` (7B v0.1 Q3_K_M) on Jetson, `qwen3:8b` on Mac |
| 🔊 **Text-to-speech** | Piper TTS | `pl_PL-darkman-medium`, subprocess playback via `aplay`/`afplay` |

---

## Features

- **Instant wake word acknowledgement** — pre-rendered "Tak?" plays with zero synthesis latency
- **Processing feedback** — "Chwileczkę..." plays while Whisper transcribes so you always know it heard you
- **Conversation history** — rolling 5-exchange memory, RAM only, never written to disk
- **Real-time datetime** — current time pre-formatted as Polish words and injected each call
- **System self-awareness** — CPU temperature and RAM injected into context; ask *"jak się czujesz?"*
- **Voice timers** — *"ustaw timer na 5 minut"* sets an interruptible background timer
- **Flexible persona** — tell ALEKSY your name and it remembers it for the session
- **Autostart on boot** — systemd user service, starts when the Jetson powers on

---

## Lessons Learned

This was a challenging build. A few honest notes for anyone building something similar:

**The biggest bottleneck was speech-to-text.** Whisper `base` on CPU takes 5–8 seconds to transcribe a 2-second sentence on the Xavier NX — a 2–3× real-time factor. The LLM inference was comparably slow (1–2 tokens/second on 7B quantized), but the STT latency was the most painful part of the user experience.

**The Jetson Xavier NX is showing its age.** JetPack 5 locks you to an old software stack — Python packages with `aarch64` compatibility issues, a pinned `onnxruntime==1.16.3`, and Ollama 0.1.46 (which lacks tool-calling support). Modern 7B Polish models like Bielik v3.0 don't run correctly on it. We ended up on Bielik 7B v0.1 Q3_K_M as the best working option.

**The fully-offline constraint is both a feature and a limitation.** It makes the device genuinely privacy-preserving, but it caps you at what local hardware can run. For a fluid conversation experience you need significantly faster inference than what a 2019-era edge board can provide.

---

## What's Next

**Unit 02** is in planning. The core idea stays the same — a self-contained Polish voice assistant in a physical enclosure — but built for speed:

- **Raspberry Pi 5** instead of Jetson Xavier NX — modern, fast CPU, great community support, smaller form factor
- **Cloud-connected** — STT and LLM via API, which drops response latency from ~15s to near-instant
- **Smaller enclosure** — more portable, cleaner design

The code will live in a separate fork once development starts.

---

## Quick Start

```bash
# Install dependencies (Python 3.11 required)
uv sync

# Pull the model (Mac dev mode)
ollama pull qwen3:8b

# Run
uv run python main.py --test   # Mac
uv run python main.py          # Jetson
```

**Prerequisites:** Ollama running on `localhost:11434`. PortAudio on macOS: `brew install portaudio`.

---

## Configuration

Profile is selected by `--test`. Machine-specific overrides go in `local_settings.py` (gitignored):

```python
# copy from local_settings.example.py
input_device_index = 11     # specific mic index
silence_threshold = 800     # VAD sensitivity
tts_enabled = False         # disable speech output
tts_thinking_text = ""      # disable "Chwileczkę..." prompt
```

---

## Privacy

| Guarantee | How |
|-----------|-----|
| 🚫 No network calls | All models run locally — zero external requests |
| 🧠 Audio stays in RAM | PCM bytes and transcripts are never written to disk |
| 💬 History stays in RAM | Rolling context exists only in process memory |
| 🔌 Air-gapped operation | No Wi-Fi or Ethernet required after initial setup |

---

## Autostart (Jetson)

```bash
cp aleksy.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable aleksy.service
sudo loginctl enable-linger $USER
```

Logs: `tail -f ~/voice-assistant/aleksy.log`

---

## License

MIT © 2026 [Mikołaj Mołodecki](https://github.com/MiniowaPM), Piotr Wittig — see [LICENSE](LICENSE).
