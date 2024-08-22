import type { IResolver } from '../IResolver'
import fetchModInfo from './fetchModInfo'
import fetchModsInfo from './fetchModsInfo'
import fetchModVersions from './fetchModVersions'
import type { IModInfo, IModInfoWithFile } from '~/shared/api/types/IModInfo'

interface Payload {
  modloader: ILoader
  version: string
}

/** Returns mod with its dependencies */
export default (modId: IModInfo, version: string, modloader: ILoader): IResolver<Payload, IModInfoWithFile[]> => {
  const modVersionsPayload = {
    mod: modId,
    version,
    loader: modloader,
  }

  return {
    async CurseForge() {
      const versions = await fetchModVersions(modVersionsPayload).CurseForge()

      const dependencies = versions[0]!.dependencies.map((dependency) => {
        return {
          id: dependency.id,
          required: dependency.required,
        }
      }).filter(dependency => dependency.required)

      const modsInfo = await fetchModsInfo([modId.id, ...dependencies.map(({ id }) => Number(id))] as number[]).CurseForge()

      const filePromises = modsInfo.map((mod) => {
        return fetchModVersions({ mod, version, loader: modloader }).CurseForge()
      })

      const files = await Promise.all(filePromises)

      return files.flatMap((modFiles) => {
        return modFiles.map((f) => {
          const mod = modsInfo.find(mod => mod.id === f.modId)

          if (!mod)
            return undefined

          return {
            ...mod,
            version: {
              name: f.name,
              id: f.id,
            },
            file: {
              url: f.file.url,
              length: f.file.length,
            },
          }
        }).filter(Boolean) as IModInfoWithFile[]
      })
    },

    async Modrinth(options) {
      const versions = await fetchModVersions(modVersionsPayload).Modrinth()

      const requiredDependencies = versions[0]!.dependencies.filter(dep => dep.required)
      const dependenciesPromises = requiredDependencies.map(({ id }) => fetchModInfo(id).Modrinth())
      const dependenciesList = (await Promise.all(dependenciesPromises))

      const dependenciesVersionsPromises = dependenciesList.map((mod) => {
        return fetchModVersions({ mod, version: options.version, loader: options.modloader }).Modrinth()
      })

      return Promise.all(dependenciesVersionsPromises).then((dependenciesVersions) => {
        const primalMod = () => {
          if (versions[0] && versions) {
            return {
              ...modId,
              version_name: versions[0].name,
              version: {
                name: versions[0].name,
                id: versions[0].id,
              },
              file: {
                url: versions[0].file.url,
                length: versions[0].file.length,
              },
            }
          }

          return null
        }

        const dependencies = dependenciesList.map((dependency, index) => {
          if (dependenciesVersions[index] && dependenciesVersions[index][0] && dependenciesVersions[index][0].file) {
            return {
              ...dependency,
              version: {
                name: dependenciesVersions[index][0].name,
                id: dependenciesVersions[index][0].id,
              },
              file: {
                url: dependenciesVersions[index][0].file.url,
                length: dependenciesVersions[index][0].file.length,
              },
            }
          }

          return null
        })

        return [primalMod(), ...dependencies].filter(Boolean) as IModInfoWithFile[]
      })
    },

  }
}
