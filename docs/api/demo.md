---
sidebar_position: 11
---

# Live Demo API

The public, no-auth endpoint that powers the **Live Demo** on the marketing
site. It runs the real verification engine in-memory, discards the images
afterwards, and never persists anything.

```http
POST /demo/verify
Content-Type: multipart/form-data
```

> No `Authorization` header is required. Anonymous requests are rate-limited by
> the shared middleware.

### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | file | Yes | Document image (passport / ID) |
| `selfie` | file | No | Selfie for face matching |
| `full_name` | string | No | Name for AML / sanctions screening |
| `mrz_lines` | string | No | JSON array of MRZ lines (manual fallback) |
| `ocr_text` | string | No | Raw OCR text hint |
| `face_match` | string | No | JSON with client-computed face match |
| `nfc` | string | No | JSON NFC request (see NFC API) |
| `liveness_challenge` | string | No | Active-liveness challenge: `blink`, `turn_left`, `turn_right`, `nod`, `smile` |
| `liveness_frames` | file[] | No | Frame burst for the active-liveness challenge (≥ 2 frames) |

### Response

```json
{
  "demo": true,
  "document": { "passed": true, "details": { "mrz_parsed": true, "mrz": {} } },
  "face_match": { "passed": true, "confidence": 0.94 },
  "aml": { "passed": true, "risk_score": 0.1 },
  "nfc": { "passed": true },
  "active_liveness": { "passed": true, "score": 0.8, "challenge": "nod", "checks": [] }
}
```

Each sub-object (`face_match`, `aml`, `nfc`, `active_liveness`) is omitted when
the corresponding inputs were not provided.
