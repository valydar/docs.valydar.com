---
sidebar_position: 7
---

# Active Liveness API

Generate and verify active liveness challenges.

## Generate Challenge

Generate a random challenge for the user to perform.

```http
POST /verifications/{id}/active-liveness/challenge
Authorization: Bearer vyd_xxx
```

### Path Parameters

| Parameter | Type | Description |
|---|---|---|
| `id` | string | Verification ID |

### Response

```json
{
  "challenge_id": "ch_a1b2c3d4e5f6",
  "challenge_type": "blink",
  "instructions": "Please blink your eyes once",
  "timeout_secs": 10
}
```

| Field | Type | Description |
|---|---|---|
| `challenge_id` | string | Unique challenge identifier |
| `challenge_type` | string | One of: `blink`, `turn_left`, `turn_right`, `nod`, `smile` |
| `instructions` | string | Human-readable instructions to display |
| `timeout_secs` | integer | Seconds to complete the challenge |

### Permissions

Requires `active_liveness:run` permission.

---

## Verify Challenge

Submit captured frames to verify the user completed the challenge.

```http
POST /verifications/{id}/active-liveness/verify
Authorization: Bearer vyd_xxx
Content-Type: multipart/form-data
```

### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|---|---|---|---|
| `challenge_type` | string | Yes | Challenge type that was generated |
| `file` | file[] | Yes | One or more frame images |

### Example

```bash
curl -X POST https://api.dev.valydar.com/verifications/vry_xxx/active-liveness/verify \
  -H "Authorization: Bearer vyd_xxx" \
  -F "challenge_type=blink" \
  -F "file=@frame1.jpg" \
  -F "file=@frame2.jpg" \
  -F "file=@frame3.jpg"
```

### Response

```json
{
  "passed": true,
  "score": 0.82,
  "checks": [
    {
      "name": "blink_detection",
      "passed": true,
      "score": 0.82,
      "reason": "detected eye brightness dip of 23.5%, consistent with blink"
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `passed` | boolean | Whether the challenge was completed successfully |
| `score` | float | Confidence score (0.0 to 1.0) |
| `checks` | array | Detailed check results |

### Errors

| Status | Description |
|---|---|
| 400 | No frames uploaded or invalid challenge type |
| 401 | Invalid API key |
| 403 | Missing `active_liveness:run` permission |
| 404 | Verification not found |

### Permissions

Requires `active_liveness:run` permission.
