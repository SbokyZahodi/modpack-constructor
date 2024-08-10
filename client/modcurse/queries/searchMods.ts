import $curse from '../$curse'
import $modr from '../$modr'
import extractModInfo from '../extractModInfo'
import type { IResolver } from '../IResolver'
import type { ICurseMod } from '../types/ICurseMod'
import type { IModrMod } from '../types/IModrMod'
import { CurseLoaders, CurseProjectTypes } from '../types/models'
import type { IModInfo } from '~/shared/api/types/IModInfo'

interface Payload {
  modloader: ILoader
  version: string
  project_type: string
  offset?: number
  take?: number
}

interface Response {
  pagination: {
    total: number
    offset: number
  }
  data: IModInfo[]
}

export default (query: string): IResolver<Payload, Response> => {
  return {

    async CurseForge(options) {
      return await $curse()<{ data: ICurseMod[], pagination: { totalCount: number, index: number } }>('mods/search', {
        query: {
          modLoaderType: CurseLoaders[options.modloader.toLowerCase() as keyof typeof CurseLoaders],
          gameVersion: options.version,
          classId: CurseProjectTypes[options.project_type as keyof typeof CurseProjectTypes],
          index: options.offset,
          searchFilter: query,
          pageSize: 20,
          sortField: 2,
          sortOrder: 'desc',
        },
      }).then((res) => {
        return {
          pagination: {
            total: res.pagination.totalCount,
            offset: res.pagination.index,
          },
          data: res.data.map((mod) => {
            return extractModInfo(mod, 'curseforge')
          }),
        }
      })
    },

    async Modrinth(options) {
      const facets = () => {
        const stack = []

        stack.push([`project_type:${options.project_type}`])
        stack.push([`versions:${options.version}`])

        if (options.project_type === 'datapack')
          stack.push([`project_type:datapack`])

        if (options.modloader && options.project_type === 'mod')
          stack.push([`categories:${options.modloader}`])

        return JSON.stringify(stack)
      }

      return await $modr<{ hits: IModrMod[], total_hits: number, offset: number }>('search', {
        query: {
          query,
          limit: 20,
          facets: facets(),
          offset: options.offset,
          project_type: options.project_type,
        },
      }).then((res) => {
        return {
          pagination: {
            total: res.total_hits,
            offset: res.offset,
          },
          data: res.hits.map((mod) => {
            return extractModInfo(mod, 'modrinth')
          }),
        }
      })
    },

  }
}
