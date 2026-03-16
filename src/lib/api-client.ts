import { ApiResponse } from "../../shared/types"
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(path, { 
      headers: { 'Content-Type': 'application/json' }, 
      ...init 
    })
    if (!res.ok) {
      let errorDetail = 'Unknown Error';
      try {
        const errorJson = await res.json() as ApiResponse<T>;
        errorDetail = errorJson.error || res.statusText;
        if (errorJson.detail) console.error('[SERVER DETAIL]', path, errorJson.detail);
        console.error('[FULL ERROR JSON]', path, errorJson);
      } catch {
        errorDetail = `HTTP ${res.status}: ${res.statusText}`;
      }
      throw new Error(`API_FAILURE [${path}]: ${errorDetail} (${res.status})`);
    }
    const json = (await res.json()) as ApiResponse<T>
    if (!json.success || json.data === undefined) {
      throw new Error(json.error || `Request to ${path} returned unsuccessful state`);
    }
    return json.data
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[API ERROR] ${path}:`, message);
    throw err;
  }
}