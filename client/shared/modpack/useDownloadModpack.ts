import filesaver from 'file-saver'
import JSZip from 'jszip'
import type { IModInfoWithFile } from '../api/types/IModInfo'

interface ModFile {
  project_type: string
  slug: string
  blob: Blob
}

interface state {
  pending: boolean
  totalBytes: number
  loadedBytes: number
}

export default () => {
  const state = useState((): state => {
    return {
      pending: false,
      totalBytes: 0,
      loadedBytes: 0,
    }
  })

  async function downloadModpack(modpack: IModPack) {
    if (!modpack.modlist.length) {
      useToast().add({ title: 'No mods installed', color: 'red' })
      return
    }

    state.value.pending = true

    // Zip instance
    const zip = new JSZip()
    const modsFolder = zip.folder('mods')
    const shadersFolder = zip.folder('shaders')
    const resourcesFolder = zip.folder('resourcepacks')

    const mods = await downloadMods(modpack.modlist)

    // Sort to folders in zip by project type
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

    state.value.pending = false
  }

  async function downloadMods(mods: IModInfoWithFile[]) {
    const modsFiles: ModFile[] = []

    // Set total size to download
    state.value.totalBytes = mods.reduce((total, version) => total + version.file.length, 0)

    const filesToDowload = mods.map(mod => downloadWithProgress(mod, (loaded) => {
      state.value.loadedBytes += loaded
    }).then((file) => {
      modsFiles.push({
        project_type: mod.project_type!,
        slug: mod.slug!,
        blob: file,
      })
    }))

    await Promise.all(filesToDowload)

    state.value.loadedBytes = 0
    return modsFiles
  }

  return {
    downloadModpack,
    state,
  }
}
