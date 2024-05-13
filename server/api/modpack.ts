import { randomBytes } from 'node:crypto'

function randomID(length: number): string {
  return randomBytes(length).toString('hex').slice(0, length)
}

export default defineEventHandler(async (event) => {
  const { method } = event

  if (method === 'POST') {
    const { modpack } = await readBody(event)

    const random = randomID(8)

    await useStorage().setItem(random, JSON.stringify(modpack))

    return random
  }
  else if (method === 'GET') {
    const { id } = getQuery<{ id: string }>(event)

    if (!id)
      return null

    const modpack = await useStorage().getItem(id)

    return modpack
  }
})
