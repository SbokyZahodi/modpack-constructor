import $curse from '../$curse'
import $modr from '../$modr'
import type { IResolver } from '../IResolver'
import type { ICurseVersion } from '../types/ICurseVersion'
import type { IModrVersion } from '../types/IModrVersion'
import { CurseLoaders } from '../types/models'
import type { IVersion } from '~/shared/api/types/IVersion'
import type { IModInfo } from '~/shared/api/types/IModInfo'

interface Payload {
  mod: IModInfo
  version: string
  loader: ILoader
}

export default (data: Payload): IResolver<void, IVersion[]> => {
  return {
    async CurseForge() {
      return await $curse()<{ data: ICurseVersion[], pagination: { totalCount: number, index: number } }>(`mods/${data.mod.id}/files`, {
        query: {
          gameVersion: data.version,
          modLoaderType: CurseLoaders[data.loader.toLowerCase() as keyof typeof CurseLoaders],
        },
      }).then(res => res.data).then((res) => {
        return res.map((version) => {
          return {
            modId: data.mod.id,
            id: version.id,
            name: version.displayName,
            file: {
              url: version.downloadUrl,
              length: version.fileLength,
            },
            dependencies: version.dependencies.map((dependency) => {
              return {
                id: dependency.modId,
                required: dependency.relationType === 3,
              }
            }),
          }
        })
      })
    },

    async Modrinth() {
      return await $modr<IModrVersion[]>(`project/${data.mod.id}/version`, {
        query: {
          game_versions: JSON.stringify([data.version]),
          loaders: data.mod.project_type === 'mod' ? JSON.stringify([data.loader]).toLowerCase() : undefined,
        },
      }).then((res) => {
        return res.map((version) => {
          return {
            modId: data.mod.id,
            id: version.id,
            name: version.name,
            file: {
              url: version.files[0]!.url,
              length: version.files[0]!.size,
            },
            dependencies: version.dependencies.map((dependency) => {
              return {
                id: dependency.project_id,
                required: dependency.dependency_type === 'required',
              }
            }),
          }
        })
      })
    },

  }
}
