---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `validateUrl(url)`

Validates whether a given URL is correctly formatted.

**Parameters:**

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `url`     | `string` | The URL to validate. |

**Example usage:**

```typescript
import { validateUrl } from '@the-node-forge/url-validator';

console.log(validateUrl('https://example.com')); // ✅ true
console.log(validateUrl('htp://invalid-url')); // ❌ false
```

**Returns:**

- `true` if the URL is valid
- `false` if the URL is invalid

---

### `isUrlLive(url, allowedStatusCodes?)`

Checks if a given URL is reachable by making an HTTP request.

**Parameters:**

| Parameter            | Type                  | Default                | Description                                              |
| -------------------- | --------------------- | ---------------------- | -------------------------------------------------------- |
| `url`                | `string`              | Required               | The URL to check if it's live.                           |
| `allowedStatusCodes` | `number[]` (optional) | `[200, 301, 302, 403]` | A list of status codes that should be considered "live". |

**Example usage:**

```typescript
import { isUrlLive } from '@the-node-forge/url-validator';

isUrlLive('https://example.com').then(console.log); // ✅ true/false

// Custom allowed status codes
isUrlLive('https://example.com', [200, 302]).then(console.log); // ✅ true if 200 or 302
```

**Returns:**

- `Promise<boolean>` – Resolves to `true` if the URL is reachable and returns a
  status in `allowedStatusCodes`, otherwise `false`.

---
