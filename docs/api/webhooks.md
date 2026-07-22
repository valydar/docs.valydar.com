---
sidebar_position: 8
---

# Webhooks

Webhooks notify your server when verification events occur. Configure your webhook URL in the admin dashboard.

## Events

| Event | Trigger |
|---|---|
| `verification.completed` | All checks finished (success or failure) |

## Payload

```json
{
  "event": "verification.completed",
  "verification_id": "vry_a1b2c3d4e5f6",
  "status": "completed",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Verification

Each webhook includes an `X-Signature` header with an HMAC-SHA256 signature:

```bash
echo -n "$BODY" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET"
```

To verify the signature:
```python
import hmac, hashlib

def verify_webhook(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

## Retry Policy

Failed deliveries are retried 3 times with exponential backoff:
- 1st retry: 1 second
- 2nd retry: 4 seconds
- 3rd retry: 9 seconds

Formula: `attempt²` seconds (quadratic backoff).

## Delivery History

```bash
GET /admin/webhooks/deliveries
```

Returns the last 50 webhook delivery attempts for your account.

**Response:**
```json
[
  {
    "id": "whd_a1b2c3d4e5f6",
    "verification_id": "vry_xxx",
    "event_type": "verification.completed",
    "webhook_url": "https://your-server.com/webhook",
    "status": "delivered",
    "status_code": 200,
    "attempt": 1,
    "max_attempts": 3,
    "created_at": "2024-01-15T10:30:00Z",
    "delivered_at": "2024-01-15T10:30:01Z"
  }
]
```

## Replay Delivery

```bash
POST /admin/webhooks/replay
```

Replays a specific webhook delivery.

**Request:**
```json
{
  "delivery_id": "whd_a1b2c3d4e5f6"
}
```

**Response:**
```json
{
  "new_delivery_id": "whd_x1y2z3w4v5u6"
}
```
