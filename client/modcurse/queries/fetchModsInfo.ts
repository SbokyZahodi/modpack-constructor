import $curse from '../$curse'
import $modr from '../$modr'
import extractModInfo from '../extractModInfo'
import type { IResolver } from '../IResolver'
import type { ICurseMod } from '../types/ICurseMod'
import type { IModrMod } from '../types/IModrMod'
import type { IModInfo } from '~/shared/api/types/IModInfo'

export default (mods: string | number[]): IResolver<void, IModInfo[]> => {
  return {
    async CurseForge() {
      return await $curse()<{ data: ICurseMod[] }>(`mods`, {
        method: 'POST',
        body: {
          modIds: mods,
          filterPcOnly: true,
        },
      }).then((res) => {
        return res.data.map(item => extractModInfo(item, 'curseforge'))
      })
    },

    async Modrinth() {
      return await $modr<IModrMod[]>(`projects`, {
        query: {
          ids: mods,
        },
      }).then((res) => {
        return res.map(item => extractModInfo(item, 'modrinth'))
      })
    },
  }
}
