import JSZip from 'jszip'
import filesaver from 'file-saver'
import downloadWithProgress from '../api/downloadWithProgress'

interface ModFile {
  project_type: string
  slug: string
  blob: Blob
}

interface state {
  isFetching: boolean
  total: number
  loaded: number
}

export default () => {
  const state = useState((): state => {
    return {
      isFetching: false,
      total: 0,
      loaded: 0,
    }
  })

  /** Downloads mods then creates zip that will be downloaded */
  async function downloadModpack(modpack: IModPack) {
    if (!modpack.modlist.length) {
      useToast().add({ title: 'No mods installed', color: 'red' })
      return
    }

    state.value.isFetching = true

    // Zip instance
    const zip = new JSZip()
    const modsFolder = zip.folder('mods')
    const shadersFolder = zip.folder('shaders')
    const resourcesFolder = zip.folder('resourcepacks')

    const mods = await downloadMods(modpack.modlist)

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
      filesaver.saveAs(content, `${modpack.loader}-${modpack.version}.zip`)
    })

    state.value.isFetching = false
  }

  /** Download mods  */
  async function downloadMods(mods: IShortModInfo[]): Promise<ModFile[]> {
    const modsFiles: ModFile[] = []

    const versions = await $api<IVersion[]>('versions', {
      params: {
        ids: JSON.stringify(mods.map(mod => mod.version)),
      },
    })

    const versionsWithModData = versions.map((version) => {
      const parent = mods.find(mod => mod.version === version.id)

      return {
        ...version,
        slug: parent?.slug,
        project_type: parent?.project_type,
      }
    })

    // Set total size to download
    state.value.total = versionsWithModData.reduce((total, version) => total + version.files[0].size, 0)

    for (const version of versionsWithModData) {
      const file = await downloadWithProgress(version.files[0].url, (loaded) => {
        state.value.loaded += loaded
      })

      modsFiles.push({
        project_type: version.project_type!,
        slug: version.slug!,
        blob: file,
      })
    }

    state.value.loaded = 0
    return modsFiles
  }

  return {
    downloadModpack,
    state,
  }
}
