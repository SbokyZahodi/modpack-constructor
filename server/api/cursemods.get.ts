export default defineEventHandler(async (event) => {
  const API_TOKEN = useRuntimeConfig().public.API_KEY

  const { url } = getQuery<{ url: string }>(event)

  return await fetch(url, {
    headers: {
      'x-api-key': API_TOKEN,
    },
  })
})
