---
sidebar_position: 3
---

# Face Match

Compares a selfie to the photo on the uploaded document to confirm the same person.

## How It Works

1. User uploads a document (with photo)
2. User uploads a selfie
3. Valydar compares the two faces using colour histograms, texture analysis, and structural similarity

## Upload a Selfie

```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/selfie \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@selfie.jpg"
```

## Run Face Match

```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/face-match \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Result

```json
{
  "passed": true,
  "confidence": 0.87,
  "threshold": 0.45,
  "algorithm": "combined",
  "document_face_detected": true,
  "selfie_face_detected": true
}
```

## Score Thresholds

| Score | Meaning |
|---|---|
| `> 0.7` | High confidence match |
| `0.45 - 0.7` | Match (above threshold) |
| `< 0.45` | No match (below threshold) |

## Tips

- Ensure good lighting for the selfie
- Face should be clearly visible and centred
- Avoid sunglasses or heavy filters
