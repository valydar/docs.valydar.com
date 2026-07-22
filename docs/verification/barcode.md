---
sidebar_position: 6
---

# Barcode Detection

Automatically detects and decodes barcodes in document images. Supports QR codes, DataMatrix, PDF417, and 1D barcode formats. Cross-validates barcode data against MRZ and visual inspection zone (VIZ) data to detect tampering.

## How It Works

1. Document image is analyzed for barcodes during document upload
2. All barcodes in the image are detected and decoded
3. PDF417 barcodes (US/Canadian driver's licenses) are parsed using AAMVA format
4. Barcode data is cross-validated against MRZ data for consistency
5. Discrepancies are flagged as potential document tampering

Barcode detection runs automatically as part of the [document verification](document) pipeline. No additional API call is needed.

## Supported Formats

| Format | Usage | Cross-Validation |
|---|---|---|
| QR Code | EU digital IDs, some visas | JSON payload compared to MRZ |
| DataMatrix | Visas, residence permits | Compared to MRZ |
| PDF417 | US/Canadian driver's licenses | AAMVA fields compared to MRZ |
| EAN-13 | Product barcodes | Detected but not cross-validated |
| EAN-8 | Product barcodes | Detected but not cross-validated |
| Code 128 | Shipping labels, visas | Detected but not cross-validated |
| Code 39 | Military IDs, some licenses | Detected but not cross-validated |
| ITF | Logistics barcodes | Detected but not cross-validated |

## AAMVA PDF417 Parsing

US and Canadian driver's licenses use PDF417 barcodes with AAMVA-compliant data elements. Valydar automatically extracts:

| Field | AAMVA Code | Description |
|---|---|---|
| Last name | DCS | Family name |
| First name | DAC | Given name |
| Middle name | DAD | Middle name |
| Date of birth | DBB | MMDDYYYY format |
| Sex | DBC | Gender code |
| Eye color | DAY | Eye color code |
| Document number | DAQ | License/ID number |
| Expiry date | DBA | MMDDYYYY format |
| Address | DAL-DAM | Street, city, state, postal code |
| Height | DAX/DCE | Height in ft/cm |
| Weight | DAW/DCH | Weight in lbs/kg |

## Cross-Validation

When both barcode and MRZ data are available, Valydar compares:

- **Document number** — barcode value must match MRZ document number
- **Name** — barcode last name must match MRZ primary identifier
- **Date of birth** — AAMVA MMDDYYYY converted to ISO format and compared to MRZ DOB

### Example: Matching Data

```json
{
  "mrz_matches_barcode": true,
  "barcode_matches_viz": true,
  "discrepancies": []
}
```

### Example: Mismatch Detected

```json
{
  "mrz_matches_barcode": false,
  "barcode_matches_viz": true,
  "discrepancies": [
    "document number mismatch: barcode='D1234567', mrz='S9876543'"
  ]
}
```

## Result Structure

The barcode check result is included in the verification's `checks_results`:

```json
{
  "type": "document",
  "result": "passed",
  "details": {
    "barcodes": [
      {
        "format": "pdf417",
        "raw_text": "DCSDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<...",
        "position": { "x": 50, "y": 200, "width": 400, "height": 80 }
      }
    ],
    "barcodes_detected": 1,
    "barcode_formats": ["pdf417"],
    "barcode_cross_validation": {
      "mrz_matches_barcode": true,
      "barcode_matches_viz": true,
      "discrepancies": []
    }
  }
}
```

## Tips

- Ensure the barcode area is clearly visible and not obscured
- Higher resolution images improve barcode detection accuracy
- For driver's licenses, the back of the card typically contains the PDF417 barcode
- Cross-validation failures may indicate document tampering — review manually
