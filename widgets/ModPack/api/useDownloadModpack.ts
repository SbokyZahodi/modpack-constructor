import JSZip from 'jszip'
import filesaver from 'file-saver'
import { useModpack } from '../model'
import HCompatibleMod from './HCompatibleMod'

interface ModFile {
  project_type: string
  slug: string
  blob: Blob
}

export default () => {
  const { modpack } = useModpack()

  const modsData = useNuxtData<IModInfo[]>('modlist')
  const modsCount = computed(() => modsData.data.value?.length)

  const state = useState('modpack-download', () => {
    return {
      isFetching: false,
      modsCount: modsCount.value,
      stage: 'Downloading mods...',
    }
  })

  /** Downloads mods and dependencies then creates zip that will be downloaded */
  async function downloadModpack() {
    if (!modsData.data.value?.length) {
      useToast().add({ title: 'No mods installed', color: 'red' })
      return
    }

    state.value.isFetching = true

    // Zip instance
    const zip = new JSZip()
    const modsFolder = zip.folder('mods')
    const shadersFolder = zip.folder('shaders')
    const resourcesFolder = zip.folder('resourcepacks')

    const mods = await downloadMods(modsData.data.value)

    // Sort to zip folders by project type | shader resourcepack mod
    mods.forEach((mod: ModFile) => {
      const { blob, slug } = mod

      if (mod.project_type === 'shader')
        shadersFolder?.file(`${slug}.zip`, blob)

      if (mod.project_type === 'resourcepack')
        resourcesFolder?.file(`${slug}.zip`, blob)

      if (mod.project_type === 'mod')
        modsFolder?.file(`${slug}.jar`, blob)
    })

    // Download zip
    zip.generateAsync({ type: 'blob' }).then((content) => {
      filesaver.saveAs(content, `${modpack.value.loader}-${modpack.value.version}.zip`)
    })

    state.value.isFetching = false
  }

  /** Download mods and their dependencies */
  async function downloadMods(modlist: IModInfo[]): Promise<ModFile[]> {
    const mods = [] as (ModFile | null)[]
    const dependencies = [] as string[]

    /** Download files by mod info */
    const downloadFiles = (mods: IModInfo[]) => mods.map(async (mod): Promise<ModFile | null> => {
      state.value.stage = `Downloading ${mod.slug}...`

      const version = await useAPI<IVersion[]>(() => `project/${mod.slug}/version`, {
        params: {
          game_versions: JSON.stringify([modpack.value.version]),
          featured: true,
        },

      })

      if (!version.data.value)
        return null

      const compatibleVersion = HCompatibleMod(version.data.value, modpack.value.loader)

      if (!compatibleVersion)
        return null

      // download file
      const blob = await (await fetch(compatibleVersion.files[0].url)).blob()

      // add dependency if exist
      if (compatibleVersion.dependencies)
        dependencies.push(...compatibleVersion.dependencies.map(dep => dep.project_id))

      return { project_type: mod.project_type, slug: mod.slug, blob }
    })

    const modsData = await Promise.all(downloadFiles(modlist))

    if (dependencies.length) {
      const dependenciesProjects = await useAPI<IModInfo[]>(() => 'projects', {
        params: {
          ids: JSON.stringify(dependencies),
        },
      })

      if (dependenciesProjects.data.value) {
        const dependencyArray = await Promise.all(downloadFiles(dependenciesProjects.data.value))

        mods.push(...dependencyArray)
      }
    }

    mods.push(...modsData)

    return mods.filter(Boolean) as ModFile[]
  }

  return {
    state,
    downloadModpack,
  }
}
