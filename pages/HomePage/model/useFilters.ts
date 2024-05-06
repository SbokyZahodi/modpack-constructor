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
    const options = []

    options.push([`project_type:${project_type.value}`])
    options.push([`versions:${modpack.value.version}`])

    if (categories.value)
      categories.value.split(',').forEach(category => options.push([`categories:${category}`]))

    if (project_type.value === 'datapack')
      options.push([`project_type:datapack`])

    if (loader.value && project_type.value === 'mod')
      options.push([`categories:${loader.value}`])

    return JSON.stringify(options)
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
