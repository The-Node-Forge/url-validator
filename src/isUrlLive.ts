export async function isUrlLive(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { mode: 'no-cors' });
    return response.ok;
  } catch {
    return false;
  }
}
