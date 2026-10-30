---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

### Basic Example

```typescript
import { validateUrl, isUrlLive } from '@the-node-forge/url-validator';
```

### Configuration

```typescript
// Import functions
import { validateUrl, isUrlLive } from '@the-node-forge/url-validator';

// Example URL validation
console.log(validateUrl('https://example.com')); // ✅ true
console.log(validateUrl('htp://invalid-url')); // ❌ false

// Example URL live check
isUrlLive('https://example.com').then(console.log); // ✅ true/false
```

---

**1️⃣ 🌐 JavaScript/TypeScript Example**

Easily integrate with **JavaScript/TypeScript**.

```typescript
import { validateUrl, isUrlLive } from '@the-node-forge/url-validator';

// Validate a URL
console.log(validateUrl('https://google.com')); // ✅ true
console.log(validateUrl('ftp://example.com')); // ❌ false (invalid protocol)

// Check if a URL is live
isUrlLive('https://example.com').then((isLive) => {
  console.log(isLive ? 'URL is live ✅' : 'URL is not reachable ❌');
});
```

---

**2️⃣ ⏱️ Custom Timeout**

`isUrlLive` gives up after 5 seconds by default. Override it with `timeoutMs`.

```typescript
import { isUrlLive } from '@the-node-forge/url-validator';

isUrlLive('https://example.com', { timeoutMs: 1000 }).then(console.log); // ✅ false if no response within 1s
```

---

For API details, see [API_REFERENCE.md](API_REFERENCE.md).

---

## ⭐ Support

If you find this package useful, please **give it a ⭐ on**  
[GitHub](https://github.com/The-Node-Forge/url-validator 'GitHub Repository')
