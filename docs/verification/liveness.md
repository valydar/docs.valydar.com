---
sidebar_position: 4
---

# Liveness Detection

Determines whether a selfie is from a live person or a spoof (photo, screen, mask).

## How It Works

Valydar analyses 6 anti-spoofing signals from the selfie:

1. **Texture frequency** — skin has natural texture patterns
2. **Colour distribution** — real skin has specific colour characteristics
3. **Edge patterns** — natural edges vs synthetic edges
4. **Noise pattern** — camera sensor noise is consistent
5. **Compression artifacts** — real photos have expected JPEG patterns
6. **Brightness uniformity** — natural lighting vs artificial sources

## Result

```json
{
  "type": "liveness",
  "result": "passed",
  "score": 0.87,
  "details": {
    "texture_score": 0.91,
    "colour_score": 0.88,
    "edge_score": 0.85,
    "noise_score": 0.82,
    "compression_score": 0.90,
    "brightness_score": 0.86
  }
}
```

## Score Thresholds

| Score | Meaning |
|---|---|
| `> 0.7` | Likely live person |
| `0.4 - 0.7` | Borderline — challenge-response recommended |
| `< 0.4` | Likely spoof attempt |

## Anti-Spoofing Coverage

| Attack Type | Detected |
|---|---|
| Printed photo | ✅ |
| Screen replay | ✅ |
| Video replay | ✅ (partial) |
| 3D mask | ⚠️ Limited |
| Deepfake | ❌ (use dedicated deepfake detection) |
