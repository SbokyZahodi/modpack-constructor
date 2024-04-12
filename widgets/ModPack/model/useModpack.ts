type Loader = 'Forge' | 'Fabric' | 'NeoForge' | 'Quilt'

interface IModpack {
  modlist: string[]
  loader: Loader
  version: string
}

export default () => {
  const defaultValue = {
    modlist: [],
    loader: 'Forge',
    version: '1.20.1',
  }

  const modpack = useState<IModpack>('modpack', () => {
    return JSON.parse(getQuery('modpack', JSON.stringify(defaultValue)))
  })

  function setVersion(version: string) {
    modpack.value.version = version
  }

  function setLoader(loader: Loader) {
    modpack.value.loader = loader
  }

  function addMod(slug: string) {
    modpack.value.modlist.push(slug)
    useToast().add({ title: 'Mod added', icon: 'ic:baseline-add' })
  }

  function removeMod(modSlug: string) {
    modpack.value.modlist = modpack.value.modlist.filter(slug => slug !== modSlug)
    useToast().add({ title: 'Mod removed', icon: 'ic:baseline-delete' })
  }

  // watch(modpack.value, () => {
  //   setQuery('modpack', JSON.stringify(modpack.value))
  // }, { immediate: false })

  return {
    modpack,
    setVersion,
    setLoader,
    addMod,
    removeMod,
  }
}
