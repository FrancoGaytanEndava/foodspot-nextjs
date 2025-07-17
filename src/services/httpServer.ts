const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function postServer<T, P = unknown>(path: string, payload?: P, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${baseURL}${path}`, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload ? JSON.stringify(payload) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed: ${res.status}`);
  }

  return res.json();
}
