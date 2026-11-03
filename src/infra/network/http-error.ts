const NOT_FOUND_STATUS = 404;

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.status = status;
  }
}

export function isNotFound(error: unknown): boolean {
  return error instanceof HttpError && error.status === NOT_FOUND_STATUS;
}
