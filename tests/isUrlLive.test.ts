import { isUrlLive } from '../src/isUrlLive';

const mockFetch = (impl: () => Promise<unknown>) => {
  const fn = jest.fn(impl);
  global.fetch = fn as unknown as typeof fetch;
  return fn as unknown as jest.Mock;
};

describe('isUrlLive', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  test('Live URL with https', async () => {
    mockFetch(() => Promise.resolve(new Response(null, { status: 200 })));

    await expect(isUrlLive('https://www.google.com')).resolves.toBe(true);
  });

  test('Live URL without protocol (should default to https)', async () => {
    const fetchMock = mockFetch(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    );

    await expect(isUrlLive('www.google.com')).resolves.toBe(true);
    expect(fetchMock.mock.calls[0]).toEqual([
      'https://www.google.com',
      expect.anything(),
    ]);
  });

  test('Redirect URL should still return true (since no-cors hides status)', async () => {
    mockFetch(() => Promise.resolve(new Response(null, { status: 301 })));

    await expect(isUrlLive('https://redirect.com')).resolves.toBe(true);
  });

  test('Forbidden URL should return true (because of no-cors limitations)', async () => {
    mockFetch(() => Promise.resolve(new Response(null, { status: 403 })));

    await expect(isUrlLive('https://forbidden.com')).resolves.toBe(true);
  });

  test('Not Found URL should return true (because fetch always succeeds in no-cors)', async () => {
    mockFetch(() => Promise.resolve(new Response(null, { status: 404 })));

    await expect(isUrlLive('https://notfound.com')).resolves.toBe(true);
  });

  test('Dead URL (network error) should return false', async () => {
    mockFetch(() => Promise.reject(new Error('Network Error')));

    await expect(isUrlLive('https://notarealwebsite.example')).resolves.toBe(false);
  });

  test('http URL is requested as-is (not rewritten to https)', async () => {
    const fetchMock = mockFetch(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    );

    await expect(isUrlLive('http://example.com')).resolves.toBe(true);
    expect(fetchMock.mock.calls[0][0]).toBe('http://example.com');
  });

  test('protocol detection is case-insensitive', async () => {
    const fetchMock = mockFetch(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    );

    await expect(isUrlLive('HTTPS://example.com')).resolves.toBe(true);
    expect(fetchMock.mock.calls[0][0]).toBe('HTTPS://example.com');
  });

  test('resolves false (never throws) for any fetch rejection', async () => {
    mockFetch(() => Promise.reject(new TypeError('fetch failed')));
    await expect(isUrlLive('https://example.com')).resolves.toBe(false);

    mockFetch(() => Promise.reject('a string, not an Error'));
    await expect(isUrlLive('https://example.com')).resolves.toBe(false);
  });

  test('resolves false for an empty string', async () => {
    mockFetch(() => Promise.reject(new TypeError('Invalid URL')));

    await expect(isUrlLive('')).resolves.toBe(false);
  });

  test('resolves false when fetch itself throws synchronously', async () => {
    global.fetch = jest.fn(() => {
      throw new Error('sync failure');
    }) as unknown as typeof fetch;

    await expect(isUrlLive('https://example.com')).resolves.toBe(false);
  });

  describe('request hardening', () => {
    test('sends a HEAD request and does not follow redirects', async () => {
      const fetchMock = mockFetch(() =>
        Promise.resolve(new Response(null, { status: 302 })),
      );

      await expect(isUrlLive('https://example.com')).resolves.toBe(true);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({
        method: 'HEAD',
        redirect: 'manual',
      });
    });

    test('cancels the response body', async () => {
      const cancel = jest.fn(() => Promise.resolve());
      mockFetch(() => Promise.resolve({ body: { cancel } }));

      await expect(isUrlLive('https://example.com')).resolves.toBe(true);
      expect(cancel).toHaveBeenCalledTimes(1);
    });

    test('still resolves true if the response has no body', async () => {
      mockFetch(() => Promise.resolve({ body: null }));

      await expect(isUrlLive('https://example.com')).resolves.toBe(true);
    });

    test('uses a 5s timeout by default', async () => {
      const timeoutSpy = jest.spyOn(AbortSignal, 'timeout');
      mockFetch(() => Promise.resolve(new Response(null, { status: 200 })));

      await isUrlLive('https://example.com');
      expect(timeoutSpy).toHaveBeenCalledWith(5000);
    });

    test('resolves false if the server never responds', async () => {
      mockHangingFetch();
      const start = Date.now();

      await expect(
        isUrlLive('https://example.com', { timeoutMs: 50 }),
      ).resolves.toBe(false);
      expect(Date.now() - start).toBeLessThan(1000);
    });

    test('passes an abort signal to fetch', async () => {
      const fetchMock = mockFetch(() =>
        Promise.resolve(new Response(null, { status: 200 })),
      );

      await isUrlLive('https://example.com');
      expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
    });
  });

  describe('non-http(s) protocols', () => {
    test.each([
      'ftp://example.com',
      'file:///etc/passwd',
      'gopher://example.com',
      'FTP://example.com',
    ])('resolves false without calling fetch: %s', async (url) => {
      const fetchMock = mockFetch(() =>
        Promise.resolve(new Response(null, { status: 200 })),
      );

      await expect(isUrlLive(url)).resolves.toBe(false);
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});

function mockHangingFetch() {
  global.fetch = jest.fn(
    (_url: unknown, init?: RequestInit) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(init.signal?.reason));
      }),
  ) as unknown as typeof fetch;
}
