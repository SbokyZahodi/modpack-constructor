interface IModpack {
  modlist: string[]
  loader: 'Forge' | 'Fabric'
  version: string
}

export default () => {
  const modpack = useState<IModpack>('modpack', () => {
    return reactive({
      modlist: [],
      loader: 'Forge',
      version: '1.20.1',
    })
  })

  function setVersion(version: string) {
    modpack.value.version = version
  }

  function setLoader(loader: 'Forge' | 'Fabric') {
    modpack.value.loader = loader
  }

  async function addMod(slug: string[]) {
    modpack.value.modlist.push(...slug)
  }

  function removeMod(modSlug: string) {
    modpack.value.modlist = modpack.value.modlist.filter(({ slug }) => slug !== modSlug)
  }

  return {
    modpack,
    setVersion,
    setLoader,
    addMod,
    removeMod,
  }
}
