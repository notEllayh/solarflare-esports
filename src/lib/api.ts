const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
      ...options.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const api = {
  post: <T>(endpoint: string, body: unknown, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method:  'POST',
      body:    JSON.stringify(body),
      headers,
    }),

  get: <T>(endpoint: string, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method: 'GET',
      headers,
    }),
} 