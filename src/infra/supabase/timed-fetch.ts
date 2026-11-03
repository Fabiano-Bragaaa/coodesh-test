const REQUEST_TIMEOUT_MS = 15_000;
const AUTH_REQUEST_TIMEOUT_MS = 10_000;
const SLOW_REQUEST_TIMEOUT_MS = 60_000;
const SLOW_PATHS = ["/functions/v1/", "/storage/v1/"];
const AUTH_PATH = "/auth/v1/";
const ABORTED_MESSAGE = "The operation was aborted.";

function urlOf(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

function isAuthRequest(url: string): boolean {
  return url.includes(AUTH_PATH);
}

function timeoutFor(url: string): number {
  if (SLOW_PATHS.some(path => url.includes(path))) return SLOW_REQUEST_TIMEOUT_MS;
  if (isAuthRequest(url)) return AUTH_REQUEST_TIMEOUT_MS;
  return REQUEST_TIMEOUT_MS;
}

async function withBody(response: Response): Promise<Response> {
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function settleBeforeAbort<T>(signal: AbortSignal, task: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const rejectOnAbort = () => reject(signal.reason instanceof Error ? signal.reason : new Error(ABORTED_MESSAGE));

    signal.addEventListener("abort", rejectOnAbort);
    task.then(resolve, reject).finally(() => signal.removeEventListener("abort", rejectOnAbort));
  });
}

async function send(url: string, input: RequestInfo | URL, init: RequestInit): Promise<Response> {
  const response = await fetch(input, init);

  return isAuthRequest(url) ? withBody(response) : response;
}

export function timedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = urlOf(input);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutFor(url));
  const outer = init?.signal;

  if (outer?.aborted) {
    controller.abort();
  } else {
    outer?.addEventListener("abort", () => controller.abort());
  }

  const request = send(url, input, { ...init, signal: controller.signal });

  return settleBeforeAbort(controller.signal, request).finally(() => clearTimeout(timer));
}
