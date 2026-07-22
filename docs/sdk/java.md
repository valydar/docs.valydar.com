---
sidebar_position: 6
---

# Java SDK

## Quick Start

```xml
<dependency>
    <groupId>com.valydar</groupId>
    <artifactId>valydar</artifactId>
    <version>0.1.0</version>
</dependency>
```

```java
import com.valydar.ValydarClient;

var client = new ValydarClient("your-api-key");

// Create a verification
var verification = client.createVerification(
    "user-123",
    List.of("document", "face_match")
);

// Check health
var health = client.health();
System.out.println(health.status());
```

## API

| Method | Description |
|--------|-------------|
| `health()` | Check API health |
| `createVerification()` | Create a new verification |
| `getVerification(id)` | Get verification status |
| `uploadDocument(ver_id, path, type)` | Upload a document image |
