export default () => {
  const API_KEY = useRuntimeConfig().public.API_KEY

  return $fetch.create({
    baseURL: 'https://api.curseforge.com/v1/',
    headers: {
      'x-api-key': API_KEY,
    },
    params: {
      gameId: 432,
    },
  })
}
