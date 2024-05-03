import { useModpack } from '~/widgets/ModPack'

export default () => {
  const { modpack } = useModpack()

  const loader = computed(() => {
    return useRoute().query.loader?.toString().toLocaleLowerCase()
  })

  const categories = computed(() => {
    return useRoute().query.categories?.toString().toLocaleLowerCase()
  })

  const project_type = computed(() => {
    return HGetQuery('project_type', 'mod')
  })

  const searchOptions = computed(() => {
    const list = []

    list.push([`project_type:${project_type.value}`])
    list.push([`versions:${modpack.value.version}`])

    if (categories.value)
      categories.value.split(',').forEach(category => list.push([`categories:${category}`]))

    if (project_type.value === 'datapack')
      list.push([`project_type:datapack`])

    if (loader.value && project_type.value === 'mod')
      list.push([`categories:${loader.value}`])

    return JSON.stringify(list)
  })

  const modlistPage = computed(() => {
    if (useRoute().query.page)
      return Number(useRoute().query.page)

    return 1
  })

  return {
    searchOptions,
    modlistPage,
    project_type,
    loader,
    categories,

  }
}
