---
sidebar_position: 8
---

# Admin API

Manage API keys and platform settings. All admin endpoints require appropriate permissions.

## List API Keys

Returns all non-revoked API keys.

```bash
curl -X GET https://api.dev.valydar.com/admin/keys \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Required permission:** `keys:list` (admin, auditor roles)

### Response

```json
[
  {
    "id": "key_abc123...",
    "client_name": "my-service",
    "role": "service",
    "created_at": "2026-01-15T10:30:00Z"
  }
]
```

## Create API Key

Creates a new API key. The key is only shown once in the response.

```bash
curl -X POST https://api.dev.valydar.com/admin/keys \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "my-service",
    "role": "service"
  }'
```

**Required permission:** `keys:create` (admin role only)

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `client_name` | string | Yes | Human-readable name for the key |
| `role` | string | No | Key role: `admin`, `service`, `readonly`, `auditor` (default: `service`) |

### Response

```json
{
  "id": "key_abc123...",
  "client_name": "my-service",
  "role": "service",
  "key": "vyd_..."
}
```

:::warning
Store the `key` value securely. It will not be shown again.
:::

## Revoke API Key

Soft-revokes an API key. The key immediately stops working.

```bash
curl -X DELETE https://api.dev.valydar.com/admin/keys/{id} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Required permission:** `keys:revoke` (admin role only)

### Response

```json
{
  "status": "ok"
}
```

## Update Webhook Configuration

Configure the webhook URL and signing secret for your API key.

```bash
curl -X PATCH https://api.dev.valydar.com/admin/webhook \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://your-server.com/webhooks/valydar",
    "webhook_secret": "your-signing-secret"
  }'
```

**Required permission:** `webhooks:manage` (admin, service roles)

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `webhook_url` | string | No | URL to receive webhook events |
| `webhook_secret` | string | No | HMAC-SHA256 secret for signature verification |

### Response

```json
{
  "status": "ok"
}
```

## Admin Dashboard

Returns an HTML dashboard showing recent verifications and webhook configuration for the authenticated key.

```bash
curl -X GET https://api.dev.valydar.com/admin \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Required permission:** `admin:dashboard` (admin, auditor roles)

## Webhook Deliveries

Returns the last 50 webhook delivery attempts for the authenticated key.

```bash
curl -X GET https://api.dev.valydar.com/admin/webhooks/deliveries \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Required permission:** `webhooks:manage` (admin, service roles)

### Response

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

## Replay Webhook Delivery

Replays a specific webhook delivery. Creates a new delivery attempt with the original payload.

```bash
curl -X POST https://api.dev.valydar.com/admin/webhooks/replay \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "delivery_id": "whd_a1b2c3d4e5f6"
  }'
```

**Required permission:** `webhooks:manage` (admin, service roles)

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `delivery_id` | string | Yes | ID of the delivery to replay |

### Response

```json
{
  "new_delivery_id": "whd_x1y2z3w4v5u6"
}
```

## Error Responses

| Status | Meaning |
|---|---|
| `401` | Missing or invalid API key |
| `403` | Key doesn't have the required permission for this endpoint |
| `404` | Key not found (for revoke) |
