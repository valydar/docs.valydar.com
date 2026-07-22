---
sidebar_position: 3
---

# Authentication & Authorization

Valydar uses API keys for authentication. All requests must include your key in the `Authorization` header using the `Bearer` scheme.

## Getting an API Key

Contact [support@valydar.com](mailto:support@valydar.com) to request a sandbox or production API key. You can also create additional keys via the [Admin API](api/admin).

## Using Your Key

Include the key in the `Authorization: Bearer` header:

```bash
curl -X GET https://api.dev.valydar.com/health \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## API Key Roles

Every API key has a role that determines which endpoints it can access. See [Authorization & Roles](authorization) for the full permission matrix.

| Role | Description |
|---|---|
| `admin` | Full access to all endpoints, including key management |
| `service` | Can create/read verifications, upload documents, run checks |
| `readonly` | Can only read verification results |
| `auditor` | Can read verifications and view admin/key listings |

If your key doesn't have permission for an endpoint, the API returns `403 Forbidden`:

```json
{
  "error": {
    "code": "forbidden",
    "message": "insufficient permissions: service requires keys:create"
  }
}
```

## Security Best Practices

- Never expose API keys in client-side code
- Store keys in environment variables or a secrets manager
- Use separate keys for sandbox and production
- Assign the least-privileged role needed
- Rotate keys regularly
- Revoke unused keys via `DELETE /admin/keys/{id}`

## Environment Variables

```bash
export VALYDAR_API_KEY="your-api-key-here"
```

```bash
curl -X POST https://api.dev.valydar.com/verifications \
  -H "Authorization: Bearer $VALYDAR_API_KEY"
```

## Rate Limits

Rate limits are per API key:

| Tier | Requests/min |
|---|---|
| All environments | 100 |

Exceeding the rate limit returns a `429 Too Many Requests` response with error code `rate_limit_exceeded`.

## Errors

| Status | Meaning |
|---|---|
| `401` | Missing or invalid API key |
| `403` | API key doesn't have permission (insufficient role) |
| `429` | Rate limit exceeded |
