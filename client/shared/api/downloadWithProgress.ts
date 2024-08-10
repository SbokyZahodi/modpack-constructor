export default async function fetchWithProgress(url: string, onProgress: (loaded: number, total: number) => void) {
  const API_KEY = useRuntimeConfig().public.API_KEY

  const headers = url.includes('curse') ? { 'x-api-key': API_KEY } : undefined

  const response = await fetch(url, {
    headers,
  })

  if (!response.ok)
    throw new Error(`Failed to download file`)

  if (!response.body)
    throw new Error(`Failed to download file`)

  const contentLength = response.headers.get('content-length')
  const total = contentLength ? Number.parseInt(contentLength, 10) : 0

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []

  while (true) {
    const { done, value } = await reader.read()
    if (done)
      break
    chunks.push(value)
    onProgress(value.length, total)
  }

  return new Blob(chunks)
}
