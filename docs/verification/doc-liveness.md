---
sidebar_position: 5
---

# Document Liveness

Verifies that an identity document is authentic and not a photocopy, printout, or digital recreation.

## How It Works

Valydar analyses 6 signals from the document image:

1. **Background uniformity** — real documents have printed backgrounds
2. **Lighting gradient** — natural light falls unevenly on real documents
3. **Edge softness** — real documents have specific edge characteristics
4. **Moiré detection** — prints and screens create moiré patterns
5. **Colour quantisation** — real documents have continuous colour tones
6. **Perspective hint** — geometric analysis of document shape

## Run Document Liveness

```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/documents/{doc_id}/liveness \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Result

```json
{
  "passed": true,
  "score": 0.93,
  "checks": [
    {
      "name": "background",
      "passed": true,
      "score": 0.95,
      "reason": "uniform background detected"
    },
    {
      "name": "lighting_gradient",
      "passed": true,
      "score": 0.91,
      "reason": "natural lighting gradient"
    },
    {
      "name": "edge_softness",
      "passed": true,
      "score": 0.89,
      "reason": "edges are soft, not printed"
    },
    {
      "name": "moire_pattern",
      "passed": true,
      "score": 0.96,
      "reason": "no moiré pattern detected"
    },
    {
      "name": "colour_quantisation",
      "passed": true,
      "score": 0.92,
      "reason": "natural colour distribution"
    },
    {
      "name": "perspective_hint",
      "passed": true,
      "score": 0.94,
      "reason": "correct perspective geometry"
    }
  ]
}
```

## Score Thresholds

| Score | Meaning |
|---|---|
| `> 0.8` | Likely authentic document |
| `0.5 - 0.8` | Borderline — may be a good photocopy |
| `< 0.5` | Likely fake or copy |

## Detected Spoof Types

| Attack Type | Detected |
|---|---|
| Photocopy | ✅ |
| Printout | ✅ |
| Screen capture | ✅ |
| Good quality scan | ⚠️ Partial |
| Tampered document | ❌ (use document check for data validation) |
