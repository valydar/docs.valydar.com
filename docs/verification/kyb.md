---
sidebar_position: 8
---

# KYB (Know Your Business)

Corporate entity verification against business registries.

```bash
curl -X POST https://api.dev.valydar.com/verifications \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"client_reference": "corp-123", "checks": ["kyb"]}'
```

## Risk Factors

| Factor | Weight |
|--------|--------|
| Country risk | 0.1 - 0.7 |
| Registry status | 0.0 - 0.5 |
| Industry risk | 0.15 - 0.8 |

## Response

```json
{
  "id": "ver_abc123",
  "status": "completed",
  "checks": {
    "kyb": {
      "passed": true,
      "details": {
        "risk_score": 0.15,
        "ubo_count": 1,
        "company_verified": true
      }
    }
  }
}
```
