---
sidebar_position: 4
---

# Python SDK

Install the Valydar Python client:

```bash
pip install valydar
```

Or from source:

```bash
pip install ./sdk/python
```

## Quick Start

```python
from valydar import ValydarClient

client = ValydarClient(api_key="your-api-key")

# Create a verification
verification = client.create_verification(
    client_reference="user-123",
    checks=["document", "face_match", "liveness"],
)
print(f"Verification: {verification.id}")

# Upload a document
doc = client.upload_document(
    verification.id,
    "/path/to/passport.jpg",
    document_type="passport",
)

# Run face match
result = client.face_match(
    verification.id,
    doc.document_id,
    selfie_id,
)
print(f"Face match: {result.passed}")
```

## API

| Method | Description |
|--------|-------------|
| `health()` | Check API health |
| `create_verification()` | Create a new verification |
| `get_verification(id)` | Get verification status |
| `upload_document(ver_id, path, type)` | Upload a document image |
| `upload_selfie(ver_id, path)` | Upload a selfie |
| `face_match(ver_id, doc_id, selfie_id)` | Run face comparison |
| `document_liveness(ver_id, doc_id)` | Check document liveness |
