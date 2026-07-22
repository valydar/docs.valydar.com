---
sidebar_position: 6
---

# AML Screening

Screen individuals against global sanctions, PEP, and watchlists.

## How It Works

Valydar maintains embedded lists from:
- **OFAC SDN** — US Treasury sanctions
- **EU Sanctions** — European Union consolidated list
- **UN Security Council** — United Nations sanctions
- **HMT** — UK HM Treasury sanctions

Name matching uses Levenshtein distance and Jaccard similarity for fuzzy matching.

## Running AML Screening

AML screening runs as part of the verification pipeline. Include `"aml"` in the checks array when creating a verification:

```bash
curl -X POST https://api.dev.valydar.com/verifications \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_reference": "user_123",
    "checks": ["aml"]
  }'
```

The name to screen is extracted from the `client_reference` field.

## Result

```json
{
  "passed": true,
  "details": {
    "sanctions_matches": [],
    "pep_matches": [],
    "watchlist_matches": [],
    "risk_level": "low"
  }
}
```

## Risk Levels

| Level | Meaning |
|---|---|
| `low` | No matches found |
| `medium` | Possible name similarity — manual review |
| `high` | Strong match — requires compliance review |

## Notes

- Screening is name-based only (no biometric matching)
- Fuzzy matching may produce false positives for common names
- Results should be reviewed by compliance officers for high-risk matches
- Sanctions lists are updated regularly
- The AML connector supports 100+ PEP names across 30+ countries
- Adverse media screening is included for flagged subjects
- Database-backed sanctions data can be loaded from PostgreSQL for production use
