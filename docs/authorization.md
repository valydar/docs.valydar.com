---
sidebar_position: 4
---

# Authorization & Roles

Valydar uses Role-Based Access Control (RBAC) to control what each API key can do. Every key is assigned a role that determines which endpoints it can access.

## Roles

| Role | Description |
|---|---|
| `admin` | Full platform access. Can manage API keys, run verifications, and access all endpoints. |
| `service` | Operational access. Can create and read verifications, upload documents and selfies, run checks. |
| `readonly` | Read-only access. Can list and view verification results, but cannot create or modify anything. |
| `auditor` | Compliance access. Can read verifications and view key listings and admin dashboard, but cannot create keys or run checks. |

## Permission Matrix

| Endpoint | admin | service | readonly | auditor |
|---|:---:|:---:|:---:|:---:|
| `POST /verifications` | ✅ | ✅ | ❌ | ❌ |
| `GET /verifications` | ✅ | ✅ | ✅ | ✅ |
| `GET /verifications/{id}` | ✅ | ✅ | ✅ | ✅ |
| `POST /verifications/{id}/documents` | ✅ | ✅ | ❌ | ❌ |
| `POST /verifications/{id}/selfie` | ✅ | ✅ | ❌ | ❌ |
| `POST /verifications/{id}/face-match` | ✅ | ✅ | ❌ | ❌ |
| `POST /verifications/{id}/documents/{doc_id}/liveness` | ✅ | ✅ | ❌ | ❌ |
| `POST /verifications/{id}/active-liveness/challenge` | ✅ | ✅ | ❌ | ❌ |
| `POST /verifications/{id}/active-liveness/verify` | ✅ | ✅ | ❌ | ❌ |
| `GET /admin/keys` | ✅ | ❌ | ❌ | ✅ |
| `POST /admin/keys` | ✅ | ❌ | ❌ | ❌ |
| `DELETE /admin/keys/{id}` | ✅ | ❌ | ❌ | ❌ |
| `GET /admin` | ✅ | ❌ | ❌ | ✅ |
| `PATCH /admin/webhook` | ✅ | ✅ | ❌ | ❌ |
| `GET /admin/webhooks/deliveries` | ✅ | ✅ | ❌ | ❌ |
| `POST /admin/webhooks/replay` | ✅ | ✅ | ❌ | ❌ |

## Creating API Keys

Only `admin` keys can create new API keys. The role is specified in the request body:

```bash
curl -X POST https://api.dev.valydar.com/admin/keys \
  -H "Authorization: Bearer ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "my-service",
    "role": "service"
  }'
```

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
The API key is only shown once at creation time. Store it securely.
:::

### Valid Roles

- `admin` — Full access
- `service` — Operational access (default)
- `readonly` — Read-only access
- `auditor` — Compliance access

## Error Responses

When a key doesn't have permission for an endpoint, the API returns `403 Forbidden`:

```json
{
  "error": {
    "code": "forbidden",
    "message": "insufficient permissions: service requires verifications:create"
  }
}
```

## Default Key

The default API key seeded from the `API_KEY` environment variable is assigned the `admin` role. This key has full access to all endpoints.

## Best Practices

- Use the **principle of least privilege** — assign the most restrictive role that meets your needs
- Use `service` keys for your backend applications
- Use `readonly` keys for dashboards or reporting tools
- Use `auditor` keys for compliance monitoring
- Never use `admin` keys in client-side code
- Rotate keys regularly and revoke unused keys
