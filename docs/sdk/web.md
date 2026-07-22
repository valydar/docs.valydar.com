---
sidebar_position: 1
---

# Web SDK

Drop-in browser SDK for identity verification. Handles document capture, selfie capture, and API communication.

## Installation

### Script Tag

```html
<script src="https://portal.valydar.com/sdk/valydar.js"></script>
```

### npm

```bash
npm install @valydar/sdk
```

```javascript
import Valydar from '@valydar/sdk';
```

## Quick Start

```html
<script src="https://portal.valydar.com/sdk/valydar.js"></script>
<script>
  const client = Valydar.create({
    baseUrl: 'https://api.dev.valydar.com',
    apiKey: 'YOUR_API_KEY',
  });

  // Create a verification
  const verification = await client.createVerification();
  console.log(verification.id);

  // Upload a document
  const fileInput = document.getElementById('doc-file');
  const doc = await client.uploadDocument(verification.id, fileInput.files[0]);
  console.log(doc.document_id);

  // Upload a selfie
  const selfieInput = document.getElementById('selfie-file');
  const selfie = await client.uploadSelfie(verification.id, selfieInput.files[0]);
  console.log(selfie.selfie_id);

  // Run face match
  const faceMatch = await client.faceMatch(verification.id);
  console.log(faceMatch.result);

  // Wait for all checks to complete
  const result = await client.waitForCompletion(verification.id, 30000);
  console.log(result);
</script>
```

## API Reference

### `Valydar.create(options)`

Creates a new SDK client.

| Option | Type | Required | Description |
|---|---|---|---|
| `baseUrl` | string | ✅ | API base URL |
| `apiKey` | string | ✅ | Your API key |

### `client.createVerification()`

Creates a new verification.

**Returns:** `Promise<{ id: string, status: string }>`

### `client.uploadDocument(verificationId, file)`

Uploads an identity document.

| Param | Type | Description |
|---|---|---|
| `verificationId` | string | Verification ID |
| `file` | File | Document image (JPEG, PNG, WebP) |

**Returns:** `Promise<{ document_id: string, type: string, status: string }>`

### `client.uploadSelfie(verificationId, file)`

Uploads a selfie for face matching and liveness.

| Param | Type | Description |
|---|---|---|
| `verificationId` | string | Verification ID |
| `file` | File | Selfie image (JPEG, PNG, WebP) |

**Returns:** `Promise<{ selfie_id: string }>`

### `client.faceMatch(verificationId)`

Runs face match between selfie and document photo.

**Returns:** `Promise<{ type: string, result: string, score: number, details: object }>`

### `client.documentLiveness(verificationId, documentId)`

Runs document authenticity check.

| Param | Type | Description |
|---|---|---|
| `verificationId` | string | Verification ID |
| `documentId` | string | Document ID |

**Returns:** `Promise<{ type: string, result: string, score: number, details: object }>`

### `client.waitForCompletion(verificationId, timeoutMs)`

Polls the verification until it reaches a terminal state.

| Param | Type | Default | Description |
|---|---|---|---|
| `verificationId` | string | — | Verification ID |
| `timeoutMs` | number | `30000` | Timeout in milliseconds |

**Returns:** `Promise<{ id: string, status: string, checks: array }>`

### `client.health()`

Checks API health.

**Returns:** `Promise<{ status: string }>`

## TypeScript

Full type definitions are included:

```typescript
import Valydar, { Verification, Document, FaceMatchResult } from '@valydar/sdk';
```

See [`valydar.d.ts`](https://github.com/valydar/sdk/blob/main/valydar.d.ts) for all types.
