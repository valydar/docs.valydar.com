---
sidebar_position: 3
---

# Documents

## Upload Document

```bash
POST /verifications/{id}/documents
```

Uploads an identity document image. Runs OCR, MRZ extraction, and document validation automatically.

**Request:**
```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/documents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@passport.jpg"
```

**Form Fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | file | ✅ | Document image (JPEG, PNG, PDF; max 10MB) |

**Response:**
```json
{
  "id": "doc_a1b2c3d4e5f6",
  "verification_id": "vry_xxx",
  "document_type": "passport",
  "filename": "passport.jpg",
  "mime_type": "image/jpeg",
  "width": 1920,
  "height": 1080,
  "file_size": 245760,
  "check": {
    "passed": true,
    "details": {
      "document_type": "passport",
      "mrz": {
        "document_number": "L01Y00T47",
        "date_of_birth": "1990-01-15",
        "date_of_expiry": "2030-01-15",
        "issuing_country": "NLD",
        "names": "JOHN DOE"
      }
    }
  }
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (format: `doc_<uuid>`) |
| `verification_id` | string | Parent verification ID |
| `document_type` | string | `passport`, `id_card`, or `drivers_license` |
| `filename` | string | Original filename |
| `mime_type` | string | MIME type |
| `width` | integer | Image width in pixels |
| `height` | integer | Image height in pixels |
| `file_size` | integer | File size in bytes |
| `check` | object | Inline document check result |

**Document Types:**

| Type | Detection |
|---|---|
| `passport` | Automatic via MRZ |
| `id_card` | Automatic via MRZ/format |
| `drivers_license` | By format/pattern |
