import type { IModInfoWithFile } from '../api/types/IModInfo'
import type { IVersion } from '../api/types/IVersion'

const defaultValue = {
  modlist: [],
  loader: 'forge' as ILoader,
  version: '1.20.4',
}

export default () => {
  const modpack = useState<IModPack>('modpack', () => {
    return defaultValue
  })

  function setVersion(version: string) {
    modpack.value.version = version
    modpack.value.modlist = []
  }

  function setLoader(loader: ILoader) {
    modpack.value.loader = loader
    modpack.value.modlist = []
  }

  function setModVersion(version: IVersion) {
    const mod = modpack.value.modlist.find(mod => mod.slug === version.modId)

    if (!mod) {
      useToast().add({ title: 'Mod not found', color: 'red' })
      return
    }

    const { name, id, file } = version

    mod.version.id = id
    mod.version.name = name
    mod.file = { ...file }

    useToast().add({ title: `${mod.slug} version has been changed to ${version.name}`, icon: ICONS.CUBE, color: 'green' })
  }

  function addMod(mod: IModInfoWithFile) {
    if (!modpack.value.modlist.some(exist => exist.slug === mod.slug)) {
      modpack.value.modlist.push(mod)
      useToast().add({ title: `${mod.title} added`, icon: ICONS.CUBE, color: 'green' })
    }
  }

  function removeMod(modSlug: string) {
    modpack.value.modlist = modpack.value.modlist.filter(mod => mod.slug !== modSlug)
    useToast().add({ title: `${modSlug} removed`, icon: 'ic:baseline-delete' })
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

    useToast().add({ title: 'Remove all mods?', icon: 'ic:baseline-delete', color: 'red', timeout: 0, actions: actions.value })
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
