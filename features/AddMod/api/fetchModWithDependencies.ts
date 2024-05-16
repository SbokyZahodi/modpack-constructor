export default async (mod: IModInfo, modpack: IModPack) => {
  const params = () => {
    if (mod.project_type === 'mod') {
      return {
        game_versions: JSON.stringify([modpack.version]),
        loaders: JSON.stringify([modpack.loader]).toLowerCase(),
      }
    }

    else {
      return {
        game_versions: JSON.stringify([modpack.version]),
        featured: true,
      }
    }
  }

  const versions = await $api<IVersion[]>(`project/${mod.slug}/version`, {
    params: params(),
  })

  if (!versions.length) {
    useToast().add({ title: 'This mod is incompatible with your version', color: 'red' })
    throw new Error('This mod is incompatible with your version')
  }

  const dependencies = versions[0].dependencies.filter(({ dependency_type }) => dependency_type === 'required')

  const dependenciesPromises = dependencies.map(({ project_id }) => $api<IModInfo>(`project/${project_id}`))

  const dependenciesList = await Promise.all(dependenciesPromises)

  const dependenciesVersions = await Promise.all(dependenciesList.map(({ slug }) => $api<IVersion[]>(`project/${slug}/version`, {
    params: params(),
  })))

  const modsToAppend = [
    { slug: mod.slug, version: versions[0].id, project_type: mod.project_type, version_name: versions[0].name },
    ...dependenciesList.map((dependency, index) => ({ slug: dependency.slug, version: dependenciesVersions[index][0].id, project_type: dependency.project_type, version_name: dependenciesVersions[index][0].name })),
  ]

  return modsToAppend
}
