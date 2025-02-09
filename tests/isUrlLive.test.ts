import { isUrlLive } from '../src/isUrlLive';
import axios from 'axios';

jest.mock('axios');

describe('isUrlLive', () => {
  test('Live URL', async () => {
    (axios.head as jest.Mock).mockResolvedValue({ status: 200 });
    await expect(isUrlLive('https://example.com')).resolves.toBe(true);
  });

  test('Dead URL', async () => {
    (axios.head as jest.Mock).mockRejectedValue(new Error('Network Error'));
    await expect(isUrlLive('https://notarealwebsite.example')).resolves.toBe(false);
  });
});
