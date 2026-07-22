---
sidebar_position: 4
---

# Selfie

## Upload Selfie

```bash
POST /verifications/{id}/selfie
```

Uploads a selfie for face matching and liveness detection.

**Request:**
```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/selfie \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@selfie.jpg"
```

**Form Fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | file | ✅ | Selfie image (JPEG, PNG; max 10MB) |

**Response:**
```json
{
  "id": "sfl_a1b2c3d4e5f6",
  "verification_id": "vry_xxx",
  "document_type": "selfie",
  "filename": "selfie.jpg",
  "mime_type": "image/jpeg",
  "liveness": {
    "passed": true,
    "score": 0.87,
    "checks": [
      {
        "name": "texture_frequency",
        "passed": true,
        "score": 0.91,
        "reason": "natural skin texture detected"
      }
    ]
  }
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | Selfie ID (format: `sfl_<uuid>`) |
| `verification_id` | string | Parent verification ID |
| `document_type` | string | Always `selfie` |
| `filename` | string | Original filename |
| `mime_type` | string | MIME type |
| `liveness` | object | Passive liveness check result |

## Notes

- Exactly one selfie per verification
- Uploading a second selfie replaces the first
- The selfie is used for both face match and liveness checks
- Face must be clearly visible and centred
- Passive liveness runs automatically on upload
- Supported formats: JPEG, PNG (WebP not supported)
