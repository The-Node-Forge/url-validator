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

**2️⃣ 🌐 Custom Allowed Status Codes**

Define which HTTP status codes should be considered "live".

```typescript
import { isUrlLive } from '@the-node-forge/url-validator';

// Custom allowed status codes
isUrlLive('https://example.com', [200, 302]).then(console.log); // ✅ true if status is 200 or 302

isUrlLive('https://example.com', [200, 301, 302, 403]).then(console.log); // ✅ true if status is in list
```

---

For API details, see [API_REFERENCE.md](API_REFERENCE.md).

---

## ⭐ Support

If you find this package useful, please **give it a ⭐ on**  
[GitHub](https://github.com/The-Node-Forge/url-validator 'GitHub Repository')
