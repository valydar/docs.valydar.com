---
sidebar_position: 10
---

# Deepfake Detection API

Detect AI-generated / synthetic faces in an uploaded selfie using classical
computer-vision heuristics and error-level analysis.

```http
POST /verifications/{id}/deepfake
Authorization: Bearer vyd_xxx
Content-Type: application/json
```

### Permissions

Requires `deepfake:run` permission.

### Request Body (JSON)

| Field | Type | Required | Description |
|---|---|---|---|
| `selfie_id` | string | Yes | ID of the uploaded selfie document |

### Response

```json
{
  "passed": true,
  "score": 0.72,
  "checks": [
    { "name": "texture_detail", "passed": true, "score": 0.7, "reason": "…" },
    { "name": "ela", "passed": true, "score": 0.7, "reason": "…" }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `passed` | boolean | Whether the selfie looks like a genuine camera capture |
| `score` | number | Combined score (0–1) |
| `checks` | array | Per-check results (name, passed, score, reason) |

### Checks

The six checks are `texture_detail`, `noise_variability`, `edge_regularity`,
`colour_warmth`, `compression_consistency`, and `ela` (error-level analysis).
The threshold is configurable via the `DEEPFAKE_THRESHOLD` environment variable.
