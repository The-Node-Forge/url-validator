const DEFAULT_TIMEOUT_MS = 5000;

/** Options for {@link isUrlLive}. */
export interface IsUrlLiveOptions {
  /** Abort the request and resolve `false` after this many milliseconds. Defaults to 5000. */
  timeoutMs?: number;
}

/**
 * Checks whether a URL is reachable by sending it an HTTP `HEAD` request.
 *
 * A URL without a protocol is requested over `https`. Any other explicit protocol
 * (`ftp://`, `file://`, ...) resolves `false` without making a request.
 *
 * "Reachable" means a response came back, whatever its status: a `404` or `500`
 * still resolves `true`. Redirects are not followed, so a 3xx also resolves `true`.
 * The request is cancelled after `options.timeoutMs`.
 *
 * Warning: this function sends a request to whatever address it is given, including
 * internal ones such as `localhost` or `169.254.169.254`. Do not call it with
 * untrusted input on a server without first checking where the host resolves to.
 *
 * @param url - The URL to check.
 * @param options - Optional settings, see {@link IsUrlLiveOptions}.
 * @returns A promise that resolves to `true` if the URL responded, otherwise `false`. Never rejects.
 */
export async function isUrlLive(
  url: string,
  options: IsUrlLiveOptions = {},
): Promise<boolean> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS } = options;

  try {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(url) && !/^https?:\/\//i.test(url)) {
      return false;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      redirect: 'manual', // never chase a redirect to an address the caller did not give us
      signal: AbortSignal.timeout(timeoutMs),
    });

    // Release the connection rather than leaving the body unread
    await response?.body?.cancel();

    return response !== undefined;
  } catch {
    return false;
  }
}
