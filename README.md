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
- ✅ **Block Invalid IP Addresses** – Prevents malformed or private IPs.
- ✅ **Customizable Allowed Status Codes** – Define which HTTP status codes should be
  considered "live".
- ✅ **Handles Redirects** – Follows up to 5 redirects by default.
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
```

---

### **2⃣ Check If a URL is Live**

Test if a URL is reachable by sending a request with customizable allowed status
codes.

```typescript
import { isUrlLive } from '@the-node-forge/url-validator';

isUrlLive('https://example.com').then(console.log); // ✅ true/false
```

#### **Customizing Allowed Status Codes**

By default, the following status codes are considered "live": `[200, 301, 302, 403]`.
You can override this list if needed:

```typescript
isUrlLive('https://example.com', [200, 301, 302]).then(console.log); // ✅ true if status is in the list
```

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
isUrlLive(url: string, allowedStatusCodes?: number[]): Promise<boolean>;
```

| Parameter            | Type                  | Description                                              |
| -------------------- | --------------------- | -------------------------------------------------------- |
| `url`                | `string`              | The URL to check if it's live.                           |
| `allowedStatusCodes` | `number[]` (optional) | A list of status codes that should be considered "live". |

**Returns:** `Promise<boolean>` – Resolves to `true` if the URL is reachable and
returns a status in `allowedStatusCodes`, otherwise `false`.

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
