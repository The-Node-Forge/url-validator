export async function isUrlLive(url: string): Promise<boolean> {
  try {
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    const response = await fetch(url, { mode: 'no-cors' });

    return response !== undefined;
  } catch {
    return false;
  }
}
