export default defineEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event)

  if (!id)
    return null

  return await useStorage('data').getItem(id)
})
