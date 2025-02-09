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
});
