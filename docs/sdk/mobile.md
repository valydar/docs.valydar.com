---
sidebar_position: 2
---

# Mobile SDKs

Mobile SDKs for iOS and Android coming soon.

## Current Status

| Platform | Status |
|---|---|
| Web (JavaScript) | ✅ Available |
| iOS (Swift) | 🔜 Planned |
| Android (Kotlin) | 🔜 Planned |
| React Native | 🔜 Planned |
| Flutter | 🔜 Planned |

## interim: Use the REST API

Until native mobile SDKs are available, use the [REST API](../api/overview) directly from your mobile app:

```swift
// iOS example
let url = URL(string: "https://api.dev.valydar.com/verifications")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("YOUR_API_KEY", forHTTPHeaderField: "Authorization")
```

```kotlin
// Android example
val client = OkHttpClient()
val request = Request.Builder()
    .url("https://api.dev.valydar.com/verifications")
    .post(body)
    .addHeader("Authorization", "YOUR_API_KEY")
    .build()
```

## Roadmap

Mobile SDKs will provide:
- Camera capture with liveness prompts
- NFC passport reading
- On-device face matching
- Offline document validation
- Push notification support
