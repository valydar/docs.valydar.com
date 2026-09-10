---
sidebar_position: 9
---

# NFC / ePassport API

Verify an ePassport chip with real ICAO 9303 cryptographic checks: passive
authentication (SOD signature), active authentication (RSA/ECDSA challenge),
and chip authentication (ECDH key agreement).

```http
POST /verifications/{id}/nfc
Authorization: Bearer vyd_xxx
Content-Type: application/json
```

### Permissions

Requires `nfc:run` permission.

### Request Body (JSON)

| Field | Type | Required | Description |
|---|---|---|---|
| `mrz_data` | object | Yes | MRZ fields read from the passport (document_number, issuing_state, names, nationality, date_of_birth, sex, date_of_expiry, optional_data) |
| `security_object` | object | Yes | The LDS Security Object (SOD): hash_algorithm, data_group_hashes, signature, issuer_certificate |
| `chip_info` | object | Yes | Chip metadata (chip_type, document_type, issued_state, dates, supported_interfaces) |
| `data_groups` | object | Yes | Raw data-group bytes, keyed by DG number (`"DG1"`, `"DG2"`, …) as base64 |
| `facial_image` | string | No | Base64 facial image (DG2) |
| `active_auth_response` | string | No | Signed challenge (base64) for active authentication |
| `active_auth_public_key` | string | No | Chip public key for active authentication |
| `chip_auth_picc_key` | string | No | Chip PICC public key for chip authentication |
| `chip_auth_terminal_key` | string | No | Terminal public key for chip authentication |

### Response

```json
{
  "passed": true,
  "passive_auth": { "passed": true, "details": {} },
  "active_auth": { "passed": true },
  "chip_auth": { "passed": true },
  "mrz_data": { "document_number": "L898902C", "names": "ERIKSSON ANNA MARIA" },
  "chip_info": { "chip_type": "ePassport" }
}
```

| Field | Type | Description |
|---|---|---|
| `passed` | boolean | Overall NFC verification result |
| `passive_auth` | object | SOD signature + data-group hash verification |
| `active_auth` | object | Challenge-response signature verification (optional) |
| `chip_auth` | object | ECDH chip authentication result (optional) |
| `mrz_data` | object | Parsed MRZ data |
| `chip_info` | object | Chip metadata |
