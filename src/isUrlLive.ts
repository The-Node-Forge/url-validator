import axios from 'axios';

export async function isUrlLive(
  url: string,
  allowedStatusCodes: number[] = [200, 301, 302, 403],
): Promise<boolean> {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      maxRedirects: 5,
    });

    return allowedStatusCodes.includes(response.status);
  } catch {
    return false;
  }
}
