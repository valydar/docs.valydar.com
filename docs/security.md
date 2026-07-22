---
sidebar_position: 9
---

# Security

## API Key Security

- Never expose API keys in client-side code
- Use environment variables or a secrets manager
- Rotate keys regularly
- Use separate keys for sandbox and production

## Data Security

- All data is encrypted in transit (TLS 1.3)
- Document images are stored encrypted at rest
- Data is processed in EU data centres
- GDPR compliant

## Webhook Security

- Each webhook includes an HMAC-SHA256 signature
- Verify the signature before processing
- Use a dedicated webhook secret

## Compliance

| Standard | Status |
|---|---|
| GDPR | ✅ Compliant |
| SOC 2 Type II | 🔜 Planned |
| ISO 27001 | 🔜 Planned |

## Data Retention

| Data Type | Retention |
|---|---|
| Verification metadata | 12 months |
| Document images | 30 days (configurable) |
| Selfie images | 30 days (configurable) |
| Check results | 12 months |

## Reporting Vulnerabilities

Contact [security@valydar.com](mailto:security@valydar.com) to report security vulnerabilities.
