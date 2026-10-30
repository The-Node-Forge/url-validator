const MAX_HOSTNAME_LENGTH = 253;
const DNS_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
const TLD = /^(?:[a-z]{2,}|xn--[a-z0-9-]{1,59})$/i;

/**
 * Checks whether a string is a well-formed `http` or `https` URL with a real
 * domain name.
 *
 * The URL is rejected if it contains whitespace or control characters, embeds
 * credentials (`user:pass@host`), uses an IP address, `localhost` or any other
 * host without a top-level domain, or has a malformed DNS label (empty, longer
 * than 63 characters, or starting/ending with a hyphen).
 *
 * This checks syntax only. It does not stop a well-formed URL from resolving to a
 * private or internal address (for example `http://internal.corp` or
 * `http://127.0.0.1.nip.io`), so it is not an SSRF filter.
 *
 * @param url - The URL to validate.
 * @returns `true` if the URL is valid, otherwise `false`. Never throws.
 */
export function validateUrl(url: string): boolean {
  if (typeof url !== 'string') {
    return false;
  }

  // `new URL` silently strips tabs/newlines and trims whitespace, so check the raw input
  // eslint-disable-next-line no-control-regex
  if (/[\s\u0000-\u001f\u007f]/.test(url)) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }

    // `https://trusted.com@evil.com` style URLs are a common phishing trick
    if (parsedUrl.username || parsedUrl.password) {
      return false;
    }

    const { hostname } = parsedUrl;
    if (hostname.length > MAX_HOSTNAME_LENGTH) {
      return false;
    }

    // Needs a domain and a TLD, which also rules out IPv4/IPv6 and bare hostnames
    const labels = hostname.split('.');
    if (labels.length < 2 || !TLD.test(labels[labels.length - 1])) {
      return false;
    }

    return labels.every((label) => DNS_LABEL.test(label));
  } catch {
    return false;
  }
}
