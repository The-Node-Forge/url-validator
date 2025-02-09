import axios from 'axios';

import { isUrlLive } from '../src/isUrlLive';

jest.mock('axios');

describe('isUrlLive', () => {
  test('Live URL with default allowed status codes', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200 });
    await expect(isUrlLive('https://example.com')).resolves.toBe(true);
  });

  test('Redirect URL is considered live', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 301 });
    await expect(isUrlLive('https://redirect.com')).resolves.toBe(true);
  });

  test('Forbidden URL is considered live by default', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 403 });
    await expect(isUrlLive('https://forbidden.com')).resolves.toBe(true);
  });

  test('Not Found URL is considered dead', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 404 });
    await expect(isUrlLive('https://notfound.com')).resolves.toBe(false);
  });

  test('Dead URL (network error)', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));
    await expect(isUrlLive('https://notarealwebsite.example')).resolves.toBe(false);
  });

  test('Custom allowed status codes (only 200 and 302)', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 403 }); // Default allows 403, but we override it
    await expect(isUrlLive('https://customstatus.com', [200, 302])).resolves.toBe(
      false,
    );
  });

  test('Custom allowed status codes (includes 403)', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 403 });
    await expect(
      isUrlLive('https://customstatus.com', [200, 301, 302, 403]),
    ).resolves.toBe(true);
  });
});
