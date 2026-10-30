<div align="center">

# URL Validator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Documentation](https://the-node-forge.github.io/url-validator/)

</div>

A **lightweight and efficient URL validation package** for JavaScript/TypeScript
applications. This package helps developers **validate URL syntax**, **check if a URL
is live**, and **ensure proper domain formatting** for better security.

---

## ✨ Features

- ✅ **Validate URL Format** – Ensures the URL follows the correct syntax.
- ✅ **Check If a URL is Live** – Uses an HTTP request to verify if a URL is
  reachable.
- ✅ **Ensure Valid Protocols** – Only accepts `http://` and `https://` URLs.
- ✅ **Validate Domain and TLD** – Ensures URLs have a proper domain and top-level
  domain.
- ✅ **Reject IP Addresses and Bare Hosts** – Only real domain names are accepted,
  not IPs or `localhost`.
- ✅ **Reject Embedded Credentials** – `https://user:pass@host` URLs are invalid.
- ✅ **Request Timeout** – `isUrlLive` gives up after 5 seconds by default.
- ✅ **Safe Redirect Handling** – `isUrlLive` never follows redirects.
- ✅ **Lightweight & Fast** – Minimal dependencies for quick performance.
- ✅ **TypeScript Support** – Fully typed for safer and better development.
- ✅ **Unit Tested** – Built with Jest to ensure reliability.

---

## 📚 Installation

```sh
npm install @the-node-forge/url-validator
```

or using Yarn:

```sh
yarn add @the-node-forge/url-validator
```

---

## 🛠️ Basic Usage

### **1⃣ Validate URL Format**

Easily check if a URL is properly formatted and follows best practices.

```typescript
import { validateUrl } from '@the-node-forge/url-validator';

console.log(validateUrl('https://example.com')); // ✅ true
console.log(validateUrl('htp://invalid-url')); // ❌ false
console.log(validateUrl('http://example')); // ❌ false (Missing TLD)
console.log(validateUrl('http://999.999.999.999')); // ❌ false (Invalid IP Address)
console.log(validateUrl('http://exa mple.com')); // ❌ false (Contains spaces)
console.log(validateUrl('https://user:pass@example.com')); // ❌ false (Embedded credentials)
console.log(validateUrl('http://localhost:3000')); // ❌ false (No domain)
```

---

### **2⃣ Check If a URL is Live**

Test if a URL is reachable by sending it an HTTP `HEAD` request.

```typescript
import { isUrlLive } from '@the-node-forge/url-validator';

isUrlLive('https://example.com').then(console.log); // ✅ true/false
```

#### **Timeout**

The request is cancelled after 5 seconds by default. Override it with `timeoutMs`:

```typescript
isUrlLive('https://example.com', { timeoutMs: 1000 }).then(console.log); // ✅ false if no response within 1s
```

#### **What "live" means**

`isUrlLive` resolves `true` if the server responded at all, whatever the status: a
`404` or `500` still counts. Redirects are not followed, so a `3xx` also counts.
Non-http(s) protocols such as `ftp://` resolve `false` without sending a request.

> ⚠️ **Server-side use:** `isUrlLive` requests whatever address it is given,
> including `localhost` and cloud metadata addresses such as `169.254.169.254`.
> `validateUrl` checks syntax only and does not prevent this (`http://internal.corp`
> is a valid URL). If you pass untrusted input to `isUrlLive` on a server, check
> where the host resolves to first.

---

## ✅ **API Reference**

### **validateUrl Function**

```typescript
validateUrl(url: string): boolean;
```

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `url`     | `string` | The URL to validate. |

**Returns:** `boolean` – `true` if the URL is valid, otherwise `false`.

---

### **isUrlLive Function**

```typescript
isUrlLive(url: string, options?: { timeoutMs?: number }): Promise<boolean>;
```

| Parameter           | Type                | Default | Description                                     |
| ------------------- | ------------------- | ------- | ----------------------------------------------- |
| `url`               | `string`            |         | The URL to check if it's live.                  |
| `options.timeoutMs` | `number` (optional) | `5000`  | Give up and resolve `false` after this many ms. |

**Returns:** `Promise<boolean>` – Resolves to `true` if the server responded (any
status, redirects not followed), otherwise `false`. Never rejects.

---

## 💡 **Contributing**

Contributions are welcome! Please submit  
[issues](https://github.com/The-Node-Forge/url-validator/issues) or  
[pull requests](https://github.com/The-Node-Forge/url-validator/pulls).

---

### ⭐ Support

If you find this package useful, please **give it a ⭐ on**  
[GitHub](https://github.com/The-Node-Forge/url-validator 'GitHub Repository')

---

### 🔗 **Links**

- 📚 [NPM Package](https://www.npmjs.com/package/@the-node-forge/url-validator)
- 🏗 [The Node Forge](https://github.com/The-Node-Forge)
