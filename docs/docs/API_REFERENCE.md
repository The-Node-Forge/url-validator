---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `validateUrl(url)`

Validates whether a given URL is a well-formed `http`/`https` URL with a real domain
name. Rejects IP addresses, `localhost`, embedded credentials (`user:pass@host`),
whitespace/control characters and malformed hostnames. This is a syntax check only
and does not prevent URLs that resolve to private addresses.

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

### `isUrlLive(url, options?)`

Checks if a given URL is reachable by sending it an HTTP `HEAD` request. Redirects
are not followed.

**Parameters:**

| Parameter           | Type                | Default  | Description                                     |
| ------------------- | ------------------- | -------- | ----------------------------------------------- |
| `url`               | `string`            | Required | The URL to check if it's live.                  |
| `options.timeoutMs` | `number` (optional) | `5000`   | Give up and resolve `false` after this many ms. |

**Example usage:**

```typescript
import { isUrlLive } from '@the-node-forge/url-validator';

isUrlLive('https://example.com').then(console.log); // ✅ true/false

// Custom timeout
isUrlLive('https://example.com', { timeoutMs: 1000 }).then(console.log); // ✅ false if no response within 1s
```

**Returns:**

- `Promise<boolean>` – Resolves to `true` if the server responded (any status, so a
  `404` still counts; redirects are not followed), otherwise `false`. Never rejects.

> ⚠️ `isUrlLive` requests whatever address it is given, including `localhost` and
> cloud metadata addresses such as `169.254.169.254`. If you pass it untrusted input
> on a server, check where the host resolves to first.

---
