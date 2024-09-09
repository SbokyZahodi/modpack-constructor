export default async () => {
  const { modpack } = useModpack()

  const modpackID = HGetQuery('modpack', null)

  if (!modpackID) {
    const sessionModpack = localStorage.getItem('modpack')

    if (!sessionModpack)
      return null

    modpack.value = JSON.parse(sessionModpack)
    return
  }

  return await $fetch<IModPack>('/api/modpack', {
    params: {
      id: modpackID,
    },
    onResponseError() {
      showError({ message: 'Modpack not found', statusCode: 404 })
    },
  })
}
