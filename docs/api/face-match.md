---
sidebar_position: 5
---

# Face Match

## Run Face Match

```bash
POST /verifications/{id}/face-match
```

Compares the uploaded selfie to the document photo.

**Request:**
```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/face-match \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Prerequisites:**
- Document uploaded via `/verifications/{id}/documents`
- Selfie uploaded via `/verifications/{id}/selfie`

**Response:**
```json
{
  "passed": true,
  "confidence": 0.87,
  "threshold": 0.45,
  "algorithm": "combined",
  "document_face_detected": true,
  "selfie_face_detected": true,
  "document_face": {
    "x": 120,
    "y": 80,
    "width": 200,
    "height": 200
  },
  "selfie_face": {
    "x": 150,
    "y": 100,
    "width": 180,
    "height": 180
  }
}
```

| Field | Type | Description |
|---|---|---|
| `passed` | boolean | Whether faces match (confidence >= threshold) |
| `confidence` | float | Match confidence (0.0 to 1.0) |
| `threshold` | float | Pass threshold (default: 0.45) |
| `algorithm` | string | Algorithm used (`combined`) |
| `document_face_detected` | boolean | Whether a face was found in document |
| `selfie_face_detected` | boolean | Whether a face was found in selfie |
| `document_face` | object | Document face bounding box (or null) |
| `selfie_face` | object | Selfie face bounding box (or null) |

## Score Thresholds

| Score | Meaning |
|---|---|
| `> 0.7` | High confidence match |
| `0.45 - 0.7` | Match (above threshold) |
| `< 0.45` | No match (below threshold) |
