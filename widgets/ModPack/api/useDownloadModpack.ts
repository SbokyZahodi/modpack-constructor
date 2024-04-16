import JSZip from 'jszip'
import filesaver from 'file-saver'
import { useModpack } from '../model'

type Stages = 'Downloading mods...' | 'Download dependencies...'

interface ModInfo {
  project_type: string
  slug: string
  blob: Blob
}

export default () => {
  const { modpack } = useModpack()

  const modsCount = computed(() => modpack.value.modlist.length)

  const state = useState('modpack-download', () => {
    return {
      isFetching: false,
      progress: 0,
      modsCount: modsCount.value,
      stage: 'Downloading mods...' as Stages,
    }
  })

  async function downloadModpack() {
    if (!modpack.value.modlist.length)
      useToast().add({ title: 'No mods installed' })

    state.value.isFetching = true

    // Zip instance
    const zip = new JSZip()
    const modsFolder = zip.folder('mods')
    const shadersFolder = zip.folder('shaders')
    const resourcesFolder = zip.folder('resourcepacks')

    const mods = await downloadMods(modpack.value.modlist)

    // Sort by project type | shader > resourcepack > mod
    mods.forEach((mod: ModInfo) => {
      const { blob, slug } = mod

      if (mod.project_type === 'shader')
        shadersFolder?.file(`${slug}.zip`, blob)

      if (mod.project_type === 'resourcepack')
        resourcesFolder?.file(`${slug}.zip`, blob)

      if (mod.project_type === 'mod')
        modsFolder?.file(`${slug}.zip`, blob)
    })

    // Download zip
    zip.generateAsync({ type: 'blob' }).then((content) => {
      filesaver.saveAs(content, `${modpack.value.loader}-${modpack.value.version}.zip`)
    })

    state.value.isFetching = false
    state.value.stage = 'Downloading mods...'
    state.value.progress = 0
  }

  async function downloadMods(modlist: { slug: string, project_type: string }[]): Promise<ModInfo[]> {
    const mods = [] as ModInfo[]
    const dependencies = [] as string[]

    for (const mod of modlist) {
      const version = await useAPI<IVersion[]>(() => `project/${mod.slug}/version`, {
        server: false,
        params: {
          game_versions: JSON.stringify([modpack.value.version]),
          featured: true,
        },
        onResponse() {
          state.value.progress++
        },
      })

      if (!version.data.value?.length)
        continue

      // Add dependencies to list
      version.data.value[0].dependencies.forEach(dep => dependencies.push(dep.project_id))

      // Download File
      const blob = await fetch(version.data.value[0].files[0].url).then(r => r.blob())

      mods.push({ project_type: mod.project_type, slug: mod.slug, blob })
    }

    const dependencyMods = await downloadDependencies(dependencies)

    return mods.concat(dependencyMods)
  }

  async function downloadDependencies(versions: string[]): Promise<ModInfo[]> {
    const mods = [] as ModInfo[]

    for (const ver of versions) {
      state.value.stage = 'Download dependencies...'

      const version = await useAPI<IVersion[]>(() => `project/${ver}/version`, {
        server: false,
        params: {
          game_versions: JSON.stringify([modpack.value.version]),
          featured: true,
        },
      })

      if (!version.data.value?.length)
        continue

      const blob = await fetch(version.data.value[0].files[0].url).then(r => r.blob())

      // Fetch project info to get project_type
      const project = await useAPI<IModInfo>(() => `project/${version.data.value?.at(0)?.project_id}`)

      const firstItem = project.data.value

      if (!firstItem)
        continue

      mods.push({ project_type: firstItem.project_type, slug: firstItem.slug, blob })
    }

    return mods
  }

  return {
    state,
    downloadModpack,
  }
}
