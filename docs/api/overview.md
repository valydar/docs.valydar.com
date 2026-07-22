---
sidebar_position: 1
---

# API Overview

Valydar is a REST API. All requests use JSON and require an API key.

## Base URLs

| Environment | Base URL |
|---|---|
| Sandbox | `https://api.dev.valydar.com` |
| Production | `https://api.valydar.com` |

## Authentication

All requests require an API key in the `Authorization: Bearer` header:

```bash
-H "Authorization: Bearer YOUR_API_KEY"
```

## Endpoints

### Verifications

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/verifications` | Create a verification |
| `GET` | `/verifications/{id}` | Get verification status |
| `GET` | `/verifications` | List verifications |

### Documents

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/verifications/{id}/documents` | Upload a document |

### Biometrics

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/verifications/{id}/selfie` | Upload a selfie |
| `POST` | `/verifications/{id}/face-match` | Run face match |
| `POST` | `/verifications/{id}/documents/{doc_id}/liveness` | Run document liveness |
| `POST` | `/verifications/{id}/active-liveness/challenge` | Generate active liveness challenge |
| `POST` | `/verifications/{id}/active-liveness/verify` | Verify active liveness |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin` | Admin dashboard |
| `GET` | `/admin/keys` | List API keys |
| `POST` | `/admin/keys` | Create API key |
| `DELETE` | `/admin/keys/{id}` | Revoke API key |
| `PATCH` | `/admin/webhook` | Update webhook URL |
| `GET` | `/admin/webhooks/deliveries` | List webhook deliveries |
| `POST` | `/admin/webhooks/replay` | Replay webhook delivery |

### System

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/openapi.json` | OpenAPI spec |
| `GET` | `/docs` | API documentation |

## Response Format

All responses are JSON:

```json
{
  "id": "vry_a1b2c3d4e5f6",
  "status": "pending",
  "client_reference": "user_123",
  "redirect_url": ""
}
```

## Error Responses

```json
{
  "error": {
    "code": "unauthorized",
    "message": "The provided API key is invalid"
  }
}
```

| Status | Error | Meaning |
|---|---|---|
| `400` | `bad_request` | Invalid request body |
| `401` | `unauthorized` | Missing or invalid API key |
| `403` | `forbidden` | Insufficient permissions |
| `404` | `not_found` | Resource doesn't exist |
| `429` | `rate_limit_exceeded` | Too many requests |
| `500` | `internal_error` | Server error |
