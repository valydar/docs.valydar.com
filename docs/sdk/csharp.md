---
sidebar_position: 5
---

# C# / .NET SDK

Install the Valydar .NET package:

```bash
dotnet add package Valydar
```

## Quick Start

```csharp
using Valydar;

var client = new ValydarClient("your-api-key");

// Create a verification
var verification = await client.CreateVerificationAsync(
    clientReference: "user-123",
    checks: new() { "document", "face_match" }
);

// Upload a document
var doc = await client.UploadDocumentAsync(
    verification.Id, "/path/to/passport.jpg", "passport"
);
```

## API

| Method | Description |
|--------|-------------|
| `HealthAsync()` | Check API health |
| `CreateVerificationAsync()` | Create a new verification |
| `GetVerificationAsync(id)` | Get verification status |
| `UploadDocumentAsync(ver_id, path, type)` | Upload a document image |
| `FaceMatchAsync(ver_id, doc_id, selfie_id)` | Run face comparison |
