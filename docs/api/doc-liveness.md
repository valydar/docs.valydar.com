---
sidebar_position: 6
---

# Document Liveness

## Run Document Liveness

```bash
POST /verifications/{id}/documents/{doc_id}/liveness
```

Checks whether a document is authentic (not a photocopy or printout).

**Request:**
```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/documents/{doc_id}/liveness \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
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

| Field | Type | Description |
|---|---|---|
| `passed` | boolean | Whether document appears authentic |
| `score` | float | Overall confidence (0.0 to 1.0) |
| `checks` | array | Individual check results |

**Check Names:**

| Check | Description |
|---|---|
| `background` | Background uniformity analysis |
| `lighting_gradient` | Natural lighting gradient detection |
| `edge_softness` | Edge softness (printed edges are sharp) |
| `moire_pattern` | Moiré pattern detection (screens/printers) |
| `colour_quantisation` | Colour quantisation analysis |
| `perspective_hint` | Geometric perspective validation |
