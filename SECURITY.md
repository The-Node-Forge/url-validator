# Security Policy

## Reporting a vulnerability

Please do not open a public issue for security problems. Report them privately via
[GitHub private vulnerability reporting](https://github.com/The-Node-Forge/url-validator/security/advisories/new).

## Scope notes

- `validateUrl` checks URL syntax only. It does not stop a valid URL from resolving
  to a private or internal address.
- `isUrlLive` requests whatever address it is given, so calling it with untrusted
  input on a server can be used for SSRF unless the caller checks where the host
  resolves to first.
