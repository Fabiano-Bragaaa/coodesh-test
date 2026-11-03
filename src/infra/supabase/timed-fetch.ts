const REQUEST_TIMEOUT_MS = 15_000;

export function timedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const outer = init?.signal;

  if (outer?.aborted) {
    controller.abort();
  } else {
    outer?.addEventListener("abort", () => controller.abort());
  }

  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}
