interface IModpack {
  modlist: string[]
  loader: ILoader
  version: string
  dependenciesAutoinstall: boolean
}

export default () => {
  const defaultValue = {
    modlist: [],
    loader: 'Forge',
    version: '1.20.1',
    dependenciesAutoinstall: true,
  }

  const modpack = useState<IModpack>('modpack', () => {
    return JSON.parse(HGetQuery('modpack', JSON.stringify(defaultValue)))
  })

  function setVersion(version: string) {
    modpack.value.version = version
    modpack.value.modlist = []
  }

  function setLoader(loader: ILoader) {
    modpack.value.loader = loader
    modpack.value.modlist = []
  }

  function addMod(slug: string) {
    if (!modpack.value.modlist.includes(slug)) {
      modpack.value.modlist.push(slug)
      useToast().add({ title: 'Mod added', icon: ICONS.CUBE, color: 'green' })
    }
  }

  function removeMod(modSlug: string) {
    modpack.value.modlist = modpack.value.modlist.filter(slug => slug !== modSlug)
    useToast().add({ title: 'Mod removed', icon: 'ic:baseline-delete' })
  }

  function removeAllMods() {
    if (!modpack.value.modlist.length) {
      useToast().add({ title: 'No mods installed', icon: ICONS.CUBE })
      return
    }

    modpack.value.modlist = []
    useToast().add({ title: 'All mods removed', icon: 'ic:baseline-delete', color: 'green' })
  }

  return {
    modpack,
    setVersion,
    setLoader,
    addMod,
    removeMod,
    removeAllMods,
  }
}
