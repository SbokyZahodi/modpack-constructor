export default defineEventHandler(async (event) => {
  const { modpack } = await readBody(event)
  const random = randomID(8)

  await useStorage('data').setItem(random, JSON.stringify(modpack))

  return random
})
