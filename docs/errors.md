---
sidebar_position: 8
---

# Errors

Valydar uses standard HTTP status codes and consistent error responses.

## Error Response Format

```json
{
  "error": "invalid_api_key",
  "message": "The provided API key is invalid"
}
```

## HTTP Status Codes

| Status | Meaning |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request — invalid input |
| `401` | Unauthorized — missing or invalid API key |
| `403` | Forbidden — key doesn't have permission |
| `404` | Not Found — resource doesn't exist |
| `409` | Conflict — resource already exists |
| `413` | Payload Too Large — file exceeds 10MB |
| `429` | Too Many Requests — rate limit exceeded |
| `500` | Internal Server Error |

## Common Errors

### Invalid API Key

```json
{
  "error": "unauthorized",
  "message": "Invalid API key"
}
```

**Fix:** Check your API key is correct and includes a valid API key.

### Rate Limited

```json
{
  "error": "rate_limited",
  "message": "Rate limit exceeded. Try again in 30 seconds."
}
```

**Fix:** Implement exponential backoff in your client.

### Verification Not Found

```json
{
  "error": "not_found",
  "message": "Verification not found"
}
```

**Fix:** Check the verification ID is correct.

### File Too Large

```json
{
  "error": "payload_too_large",
  "message": "File exceeds maximum size of 10MB"
}
```

**Fix:** Compress the image before uploading.

### Missing Document

```json
{
  "error": "bad_request",
  "message": "Document required before running face match"
}
```

**Fix:** Upload a document before running face match.
