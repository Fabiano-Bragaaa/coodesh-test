import { HttpError } from "../network/http-error";
import { timedFetch } from "../network/timed-fetch";

const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2";

async function get<Data>(path: string): Promise<Data> {
  const response = await timedFetch(`${DICTIONARY_API_URL}${path}`);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
}

export const dictionaryClient = { get };
