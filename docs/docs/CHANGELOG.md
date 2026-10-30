---
title: Changelog
description: A detailed changelog.
sidebar_position: 5
---

### v1.0.0 - 2025-02-09

- Initial release

### v1.1.0 - 2026-10-30

- `isUrlLive` now sends a `HEAD` request, does not follow redirects, cancels the
  response body, and times out after 5s (configurable with `{ timeoutMs }`).
- `isUrlLive` resolves `false` for explicit non-http(s) protocols instead of
  requesting `https://ftp://...`.
- `validateUrl` now rejects whitespace/control characters (including tabs and
  newlines that `new URL` silently strips), embedded credentials, malformed DNS
  labels and hostnames over 253 characters. Punycode TLDs (`.xn--p1ai`) are now
  accepted.
- Fixed the published package failing to load (`ERR_MODULE_NOT_FOUND` on both
  `require` and `import`): the build is now CommonJS and `exports` includes types.
- Documentation no longer describes `allowedStatusCodes` or redirect following, which
  were never implemented.

<!-- ### v1.0.1 - YYYY-MM-DD

- Bug fix -->
