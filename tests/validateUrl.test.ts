import { validateUrl } from '../src/validateUrl';

describe('validateUrl', () => {
  test('Invalid URLs', () => {
    expect(validateUrl('not-a-url')).toBe(false);
    expect(validateUrl('htp://wrongformat.com')).toBe(false);
    expect(validateUrl('http://example')).toBe(false); // Missing TLD
    expect(validateUrl('http://.com')).toBe(false); // Invalid domain
    expect(validateUrl('http://999.999.999.999')).toBe(false); // Invalid IP
    expect(validateUrl('http://exa mple.com')).toBe(false); // Space in URL
  });

  test('Valid URLs', () => {
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('http://sub.example.org')).toBe(true);
    expect(validateUrl('https://www.google.com')).toBe(true);
  });

  describe('protocols', () => {
    test.each([
      'ftp://example.com',
      'file:///etc/passwd',
      'javascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'mailto:user@example.com',
      'ws://example.com',
    ])('rejects non-http(s) protocol: %s', (url) => {
      expect(validateUrl(url)).toBe(false);
    });

    test('accepts protocols case-insensitively', () => {
      expect(validateUrl('HTTPS://example.com')).toBe(true);
      expect(validateUrl('HtTp://example.com')).toBe(true);
    });
  });

  describe('IP addresses and hosts without a domain', () => {
    test.each([
      'http://127.0.0.1',
      'http://192.168.1.1',
      'http://10.0.0.1:8080',
      'http://[::1]',
      'http://[2001:db8::1]',
      'http://localhost',
      'http://localhost:3000',
    ])('rejects %s', (url) => {
      expect(validateUrl(url)).toBe(false);
    });
  });

  describe('URL components', () => {
    test('accepts ports, paths, queries and fragments', () => {
      expect(validateUrl('https://example.com:8443')).toBe(true);
      expect(validateUrl('https://example.com/a/b/c')).toBe(true);
      expect(validateUrl('https://example.com/search?q=a&b=c')).toBe(true);
      expect(validateUrl('https://example.com/page#section')).toBe(true);
    });

    test('rejects a space in the path, query or fragment', () => {
      expect(validateUrl('https://example.com/a b')).toBe(false);
      expect(validateUrl('https://example.com/?q=a b')).toBe(false);
      expect(validateUrl('https://example.com/#a b')).toBe(false);
    });

    test('accepts percent-encoded spaces', () => {
      expect(validateUrl('https://example.com/a%20b')).toBe(true);
    });

    test('accepts internationalized domains (converted to punycode)', () => {
      expect(validateUrl('https://münchen.de')).toBe(true);
    });
  });

  describe('malformed input', () => {
    test('rejects empty and whitespace-only strings', () => {
      expect(validateUrl('')).toBe(false);
      expect(validateUrl('   ')).toBe(false);
    });

    test('rejects a URL with no host', () => {
      expect(validateUrl('https://')).toBe(false);
      expect(validateUrl('http:///path')).toBe(false);
    });

    test('rejects a trailing-dot hostname', () => {
      expect(validateUrl('https://example.com.')).toBe(false);
    });

    test('never throws on non-string input', () => {
      expect(validateUrl(undefined as unknown as string)).toBe(false);
      expect(validateUrl(null as unknown as string)).toBe(false);
      expect(validateUrl(42 as unknown as string)).toBe(false);
      expect(validateUrl({} as unknown as string)).toBe(false);
    });

    test('handles very long input without hanging', () => {
      const start = Date.now();
      expect(validateUrl(`https://${'a.'.repeat(50_000)}com`)).toBe(false);
      expect(validateUrl(`https://example.com/${'a'.repeat(1_000_000)}`)).toBe(true);
      expect(Date.now() - start).toBeLessThan(1000);
    });
  });

  describe('hardening', () => {
    test.each([
      ['newline in host', 'https://exa\nmple.com'],
      ['tab in host', 'https://exam\tple.com'],
      ['carriage return', 'https://example.com\r\nHost: evil.com'],
      ['null byte', 'https://example.com/\u0000'],
      ['leading space', ' https://example.com'],
      ['trailing newline', 'https://example.com\n'],
    ])('rejects whitespace/control characters: %s', (_name, url) => {
      expect(validateUrl(url)).toBe(false);
    });

    test.each([
      'https://user:pass@example.com',
      'https://user@example.com',
      'https://example.com@evil.com',
      'https://:pass@example.com',
    ])('rejects embedded credentials: %s', (url) => {
      expect(validateUrl(url)).toBe(false);
    });

    test('allows an @ in the path, query or fragment', () => {
      expect(validateUrl('https://example.com/@user')).toBe(true);
      expect(validateUrl('https://example.com/?email=a@b.com')).toBe(true);
    });

    test.each([
      'https://a..b.com',
      'https://-a.com',
      'https://a-.com',
      'https://exa_mple.com',
      'https://.example.com',
      'https://example.c',
      'https://example.123',
      `https://${'a'.repeat(64)}.com`,
      `https://${'a.'.repeat(130)}com`,
    ])('rejects malformed hostnames: %s', (url) => {
      expect(validateUrl(url)).toBe(false);
    });

    test('accepts boundary-length labels and hostnames', () => {
      expect(validateUrl(`https://${'a'.repeat(63)}.com`)).toBe(true);
      expect(
        validateUrl(
          `https://${'a'.repeat(61)}.${'b'.repeat(61)}.${'c'.repeat(61)}.com`,
        ),
      ).toBe(true);
    });

    test('accepts hyphens inside labels and digits in subdomains', () => {
      expect(validateUrl('https://my-site.example.com')).toBe(true);
      expect(validateUrl('https://123.example.com')).toBe(true);
    });

    test('accepts internationalized TLDs (punycode)', () => {
      expect(validateUrl('https://example.рф')).toBe(true);
      expect(validateUrl('https://пример.рф')).toBe(true);
    });

    test('rejects hosts that only look like IP addresses', () => {
      expect(validateUrl('http://0x7f.1')).toBe(false);
      expect(validateUrl('http://2130706433')).toBe(false); // 127.0.0.1 as a decimal
      expect(validateUrl('http://127.1')).toBe(false);
    });

    test('rejects non-string input even if it stringifies to a valid URL', () => {
      const sneaky = { toString: () => 'https://example.com' };
      expect(validateUrl(sneaky as unknown as string)).toBe(false);
      expect(validateUrl(new URL('https://example.com') as unknown as string)).toBe(
        false,
      );
    });
  });
});
