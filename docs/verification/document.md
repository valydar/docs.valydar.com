---
sidebar_position: 2
---

# Document Verification

Extracts and validates identity documents (passports, ID cards, driver's licenses).

## How It Works

1. User uploads a document image
2. Valydar performs OCR and MRZ extraction
3. Barcodes are detected and decoded (PDF417, QR, DataMatrix)
4. Barcode data is cross-validated against MRZ for tampering detection
5. Document format, expiry, and data consistency are validated

## Upload a Document

```bash
curl -X POST https://api.dev.valydar.com/verifications/{id}/documents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@passport.jpg"
```

### Accepted Formats

- JPEG, PNG, WebP
- Maximum size: 10 MB

### Response

```json
{
  "document_id": "doc_abc123",
  "type": "passport",
  "status": "uploaded"
}
```

## Result

```json
{
  "type": "identity",
  "result": "passed",
  "score": 0.95,
  "details": {
    "document_type": "passport",
    "document_number": "AB1234567",
    "name": "JOHN DOE",
    "date_of_birth": "1990-01-15",
    "nationality": "NLD",
    "expiry_date": "2030-01-15",
    "mrz_valid": true,
    "barcodes_detected": 1,
    "barcode_formats": ["pdf417"],
    "barcode_cross_validation": {
      "mrz_matches_barcode": true,
      "discrepancies": []
    }
  }
}
```

See [Barcode Detection](barcode) for details on barcode formats and cross-validation.

## Supported Document Types

| Type | MRZ | NFC | Notes |
|---|---|---|---|
| Passport | ✅ | ✅ | All ICAO 9303 passports |
| ID Card | ✅ | ✅ | EU, UK, and many international |
| Driver's License | ❌ | ❌ | Format varies by country |

## Tips

- Ensure the document is flat and fully visible
- Avoid glare and shadows
- Both front and back can be uploaded (for ID cards)
