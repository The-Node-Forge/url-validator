import { isUrlLive } from '../src/isUrlLive';

describe('isUrlLive', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Live URL returns true', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://example.com')).resolves.toBe(true);
  });

  test('Redirect URL returns false (no-cors hides status)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 301 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://redirect.com')).resolves.toBe(false);
  });

  test('Forbidden URL returns false (fetch does not expose status)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 403 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://forbidden.com')).resolves.toBe(false);
  });

  test('Not Found URL returns false', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 404 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://notfound.com')).resolves.toBe(false);
  });

  test('Dead URL (network error) returns false', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network Error')),
    ) as jest.Mock;

    await expect(isUrlLive('https://notarealwebsite.example')).resolves.toBe(false);
  });

  test('Fetch failure (500 Internal Server Error) returns false', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 500 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://servererror.com')).resolves.toBe(false);
  });
});
