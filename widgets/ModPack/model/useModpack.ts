interface IModpack {
  modlist: IShortModInfo[]
  loader: ILoader
  version: string
  dependenciesAutoinstall: boolean
}

export default () => {
  const defaultValue = {
    modlist: [],
    loader: 'Forge',
    version: '1.20.4',
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

  function setModVersion(projectId: string, version: string, version_name: string) {
    const mod = modpack.value.modlist.find(mod => mod.slug === projectId)

    if (!mod) {
      useToast().add({ title: 'Mod not found', color: 'red' })
      return
    }

    mod.version = version
    mod.version_name = version_name

    useToast().add({ title: `${mod.slug} version has been changed to ${mod.version_name}`, icon: ICONS.CUBE, color: 'green' })

    HSetQuery('modpack', JSON.stringify(modpack.value))
  }

  function addMod(mod: IShortModInfo) {
    if (!modpack.value.modlist.some(exist => exist.slug === mod.slug)) {
      modpack.value.modlist.push(mod)
      useToast().add({ title: 'Mod added', icon: ICONS.CUBE, color: 'green' })
    }
  }

  function removeMod(modSlug: string) {
    modpack.value.modlist = modpack.value.modlist.filter(mod => mod.slug !== modSlug)
    useToast().add({ title: 'Mod removed', icon: 'ic:baseline-delete' })
  }

  function removeAllMods() {
    if (!modpack.value.modlist.length) {
      useToast().add({ title: 'No mods installed', icon: ICONS.CUBE })
      return
    }

    const actions = ref([{
      label: 'Confirm',
      click: () => modpack.value.modlist = [],
    }, {
      label: 'Cancel',
    }])

    useToast().add({ title: 'Remove all mods?', icon: 'ic:baseline-delete', color: 'red', actions, timeout: 0, closeButton: false })
  }

  return {
    modpack,
    setVersion,
    setLoader,
    addMod,
    removeMod,
    removeAllMods,
    setModVersion,
  }
}
