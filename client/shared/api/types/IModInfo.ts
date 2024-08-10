export interface IModInfo {
  id: string | number
  slug: string
  title: string
  downloads: number
  logo: string
  gallery: any[]
  description: string
  project_type: string
  provider: 'curseforge' | 'modrinth'
}

export interface IModInfoWithVersion extends IModInfo {
  version: {
    id: string | number
    name: string
  }
}

export interface IModInfoWithFile extends IModInfoWithVersion {
  file: {
    url: string
    length: number
  }
}
