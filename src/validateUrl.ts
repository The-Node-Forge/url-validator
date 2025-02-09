export function validateUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    // Ensure valid protocols (http/https)
    const validProtocols = new Set(['http:', 'https:']);
    if (!validProtocols.has(parsedUrl.protocol)) {
      return false;
    }

    // Check for valid domain/TLD
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainPattern.test(parsedUrl.hostname)) {
      return false;
    }

    // Reject malformed IP addresses
    const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$|^\[?[a-fA-F0-9:]+\]?$/;
    if (ipPattern.test(parsedUrl.hostname)) {
      return false;
    }

    // Reject spaces in URL
    if (url.includes(' ')) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
