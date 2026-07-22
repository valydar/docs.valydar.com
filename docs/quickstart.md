---
sidebar_position: 2
---

# Quickstart

Get up and running with Valydar in 5 minutes.

## Prerequisites

- API key (sandbox or production)
- cURL, Postman, or any HTTP client
- A test document image (passport, ID card, or driver's license)

## Step 1: Create a verification

```bash
curl -X POST https://api.dev.valydar.com/verifications \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"checks_requested": ["document"]}'
```

Response:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "client_reference": "",
  "status": "pending",
  "checks_requested": ["document"],
  "checks_results": {},
  "redirect_url": "",
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": null
}
```

Save the `id` — you'll need it for all subsequent requests.

## Step 2: Upload a document

```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/documents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@passport.jpg"
```

Response:
```json
{
  "document_id": "doc_abc123",
  "type": "passport",
  "status": "completed",
  "mrz": {
    "document_type": "passport",
    "issuing_state": "NLD",
    "name": "JOHN DOE",
    "dob": "1990-01-15",
    "document_number": "SPECIMEN123"
  }
}
```

## Step 3: Get results

```bash
curl https://api.dev.valydar.com/verifications/{id} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "checks_requested": ["document"],
  "checks_results": {
    "document": {
      "passed": true,
      "score": 0.95,
      "details": {
        "document_type": "passport",
        "name": "JOHN DOE",
        "dob": "1990-01-15",
        "nationality": "NLD"
      }
    }
  },
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:30:05Z"
}
```

## Using the SDK

```html
<script src="https://portal.valydar.com/sdk/valydar.js"></script>
<script>
  const client = Valydar.create({ apiKey: 'YOUR_API_KEY' });

  const verification = await client.createVerification();
  await client.uploadDocument(verification.id, fileInput.files[0]);
  const result = await client.waitForCompletion(verification.id, 30000);
  console.log(result);
</script>
```

## Next Steps

- [Authentication](authentication) — API key management
- [Verification Types](verification/overview) — Available checks
- [Web SDK](sdk/web) — Full SDK reference
