---
sidebar_position: 2
---

# Verifications

## Create Verification

```bash
POST /verifications
```

Creates a new verification session.

**Request:**
```bash
curl -X POST https://api.dev.valydar.com/verifications \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_reference": "user_123",
    "checks": ["identity", "document", "face_match", "liveness"]
  }'
```

**Response:**
```json
{
  "id": "vry_a1b2c3d4e5f6",
  "status": "pending",
  "client_reference": "user_123",
  "redirect_url": ""
}
```

---

## Get Verification

```bash
GET /verifications/{id}
```

Returns the current state and all completed checks.

**Request:**
```bash
curl https://api.dev.valydar.com/verifications/{id} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "vry_a1b2c3d4e5f6",
  "status": "completed",
  "client_reference": "user_123",
  "checks_results": {
    "document": {
      "passed": true,
      "details": {
        "document_type": "passport",
        "mrz": { ... }
      }
    },
    "liveness": {
      "passed": true,
      "score": 0.87,
      "checks": [...]
    }
  },
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:30:05Z"
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | Verification ID (format: `vry_<uuid>`) |
| `status` | string | `pending`, `completed`, or `failed` |
| `client_reference` | string | Your reference ID |
| `checks_results` | object | Results keyed by check name |
| `created_at` | string | ISO 8601 timestamp |
| `completed_at` | string | ISO 8601 timestamp (null if not finished) |

---

## List Verifications

```bash
GET /verifications
```

Returns a paginated list of verifications for the authenticated client.

**Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | 20 | Max results (1-100) |
| `offset` | integer | 0 | Pagination offset |
| `status` | string | — | Filter by status |

**Request:**
```bash
curl "https://api.dev.valydar.com/verifications?limit=10&status=completed" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": "vry_a1b2c3d4e5f6",
    "status": "completed",
    "client_reference": "user_123",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```
