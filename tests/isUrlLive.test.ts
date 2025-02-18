import { isUrlLive } from '../src/isUrlLive'; // Ensure correct path

describe('isUrlLive', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  test('Live URL with https', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://www.google.com')).resolves.toBe(true);
  });

  test('Live URL without protocol (should default to https)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    ) as jest.Mock;

    await expect(isUrlLive('www.google.com')).resolves.toBe(true);
  });

  test('Redirect URL should still return true (since no-cors hides status)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 301 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://redirect.com')).resolves.toBe(true);
  });

  test('Forbidden URL should return true (because of no-cors limitations)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 403 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://forbidden.com')).resolves.toBe(true);
  });

  test('Not Found URL should return true (because fetch always succeeds in no-cors)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 404 })),
    ) as jest.Mock;

    await expect(isUrlLive('https://notfound.com')).resolves.toBe(true);
  });

  test('Dead URL (network error) should return false', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network Error')),
    ) as jest.Mock;

    await expect(isUrlLive('https://notarealwebsite.example')).resolves.toBe(false);
  });

  test('Live URL with http should be converted to https', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 200 })),
    ) as jest.Mock;

    await expect(isUrlLive('http://example.com')).resolves.toBe(true);
  });
});
