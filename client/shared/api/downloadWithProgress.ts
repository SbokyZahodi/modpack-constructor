import type { IModInfoWithFile } from './types/IModInfo'

export default async function fetchWithProgress(mod: IModInfoWithFile, onProgress: (loaded: number, total: number) => void) {
  if (!mod.file.url) {
    useToast().add({ title: 'Mod not found', color: 'red' })

    return null
  }

  const url = () => {
    if (mod.provider === 'curseforge') {
      return `api/cursemods?url=${mod.file.url}`
    }

    else {
      return mod.file.url
    }
  }

  const response = await fetch(url())

  if (!response.ok)
    throw new Error(`Failed to download mod ${mod.slug} (${mod.provider})`)

  if (!response.body)
    throw new Error(`Failed to download mod ${mod.slug} (${mod.provider})`)

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
