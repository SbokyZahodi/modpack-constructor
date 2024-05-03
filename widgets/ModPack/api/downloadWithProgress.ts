export default async function fetchWithProgress(url: string, onProgress: (loaded: number, total: number) => void) {
  const response = await fetch(url)

  if (!response.ok)
    throw new Error(`Failed to download mod`)

  if (!response.body)
    throw new Error(`Failed to download mod`)

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
