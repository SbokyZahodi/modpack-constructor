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
    modpack.value.modlist.push(slug)
    useToast().add({ title: 'Mod added', icon: 'ic:baseline-add', color: 'green' })
  }

  function removeMod(modSlug: string) {
    modpack.value.modlist = modpack.value.modlist.filter(slug => slug !== modSlug)
    useToast().add({ title: 'Mod removed', icon: 'ic:baseline-delete' })
  }

  return {
    modpack,
    setVersion,
    setLoader,
    addMod,
    removeMod,
  }
}
