---
sidebar_position: 1
---

# Verification Overview

Valydar provides a pipeline of checks that can be composed together. Each verification has a status that progresses through the pipeline.

## Verification States

```
pending → completed | failed
```

| State | Description |
|---|---|
| `pending` | Verification created, checks queued or in progress |
| `completed` | All checks finished |
| `failed` | One or more checks failed |

## Available Checks

| Check | Endpoint | Description |
|---|---|---|
| [Document](document) | — (runs on upload) | OCR, MRZ extraction, format validation |
| [Barcode](barcode) | — (runs on upload) | Barcode detection, AAMVA parsing, MRZ cross-validation |
| [Face Match](face-match) | `/verifications/{id}/face-match` | Compare selfie to document photo |
| [Liveness](liveness) | — (runs on selfie upload) | Passive selfie anti-spoofing (is it a real person?) |
| [Active Liveness](active-liveness) | `/verifications/{id}/active-liveness/*` | Challenge-response verification (blink, turn head, etc.) |
| [Document Liveness](doc-liveness) | `/verifications/{id}/documents/{doc_id}/liveness` | Document authenticity (is it real or a copy?) |
| [AML](aml) | — (runs in background) | Sanctions, PEP, and watchlist screening |
| [KYB](kyb) | — (runs in background) | Know Your Business — corporate entity verification |
| [Affordability](affordability) | — (runs in background) | Disposable income assessment for player protection |

## Result Structure

Each check returns a result with a boolean pass/fail:

```json
{
  "passed": true,
  "score": 0.95,
  "details": {}
}
```

| Field | Type | Description |
|---|---|---|
| `passed` | boolean | Whether the check passed |
| `score` | float | Confidence score (0.0 to 1.0, if applicable) |
| `details` | object | Check-specific data |

Results are stored in `checks_results` keyed by check name (e.g., `document`, `liveness`, `face_match`).
