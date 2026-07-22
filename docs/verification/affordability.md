---
sidebar_position: 10
---

# Affordability Check

Estimate disposable income for player protection and responsible gaming compliance.

## How It Works

The affordability engine estimates disposable income using:

- **Declared income** — user-provided monthly income
- **Country-based brackets** — average income ranges for 20+ countries
- **Expenses estimation** — base living costs plus dependent costs
- **Disposable income** = estimated income &minus; estimated expenses

## Running Affordability

Include `"affordability"` in the checks array when creating a verification:

```bash
curl -X POST https://api.dev.valydar.com/verifications \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_reference": "user_123",
    "checks": ["affordability"]
  }'
```

## Result

```json
{
  "passed": true,
  "details": {
    "estimated_monthly_income": 3500,
    "estimated_monthly_expenses": 1750,
    "disposable_income": 1750,
    "income_confidence": "Estimated",
    "country": "NL",
    "dependents": 0
  }
}
```

## Affordability Tiers

| Tier | Disposable Income | Description |
|------|-------------------|-------------|
| `Low` | &lt; 30% of low bracket | High risk — limited capacity |
| `Medium` | 30–40% of medium bracket | Moderate capacity |
| `High` | &gt; 40% of medium bracket | Strong capacity |

## Income Brackets by Country

| Country | Low | Medium | High |
|---------|-----|--------|------|
| Netherlands | €2,000 | €3,500 | €5,500 |
| Germany | €2,200 | €3,800 | €6,000 |
| Sweden | €2,400 | €4,000 | €6,200 |
| Norway | €3,000 | €4,800 | €7,500 |
| Switzerland | €3,500 | €5,500 | €8,500 |
| US | $3,000 | $5,000 | $8,000 |
| Other | €1,500 | €2,500 | €4,000 |

## Notes

- Without a declared income, the engine uses country averages (proxy mode)
- Expenses default to 50% of income + €500 per dependent
- For high rollers, a PSD2-based deep check via Open Banking can be added
- Affordability checks are the highest-priced verification type
