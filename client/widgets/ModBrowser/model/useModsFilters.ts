export default () => {
  const project_type = computed(() => {
    return HGetQuery('project_type', 'mod')
  })

  const searchPage = ref(Number(HGetQuery('page', 1)))
  const offset = computed(() => (searchPage.value - 1) * 20)
  const modName = ref('')

  watch(() => searchPage.value, () => {
    HSetQuery('page', String(searchPage.value))
  })

  const provider = computed(() => {
    return HGetQuery('provider', 'modrinth')
  })

  return {
    project_type,
    searchPage,
    offset,
    modName,
    provider,
  }
}
