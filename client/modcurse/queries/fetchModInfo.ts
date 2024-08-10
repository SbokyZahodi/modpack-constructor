import $curse from '../$curse'
import $modr from '../$modr'
import extractModInfo from '../extractModInfo'
import type { IResolver } from '../IResolver'
import type { ICurseMod } from '../types/ICurseMod'
import type { IModrMod } from '../types/IModrMod'
import type { IModInfo } from '~/shared/api/types/IModInfo'

export default (modId: string | number): IResolver<void, IModInfo> => {
  return {
    async CurseForge() {
      return await $curse()<{ data: ICurseMod }>(`mods/${modId}`).then((res) => {
        return extractModInfo(res.data, 'curseforge')
      })
    },

    async Modrinth() {
      return await $modr<IModrMod>(`project/${modId}`).then((res) => {
        return extractModInfo(res, 'modrinth')
      })
    },

  }
}
