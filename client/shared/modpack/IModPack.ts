import type { IModInfoWithFile } from '../api/types/IModInfo'

export interface IModPack {
  modlist: IModInfoWithFile[]
  loader: ILoader
  version: string
}
