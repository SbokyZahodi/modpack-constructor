import type { ICurseMod } from './types/ICurseMod'
import type { IModrMod } from './types/IModrMod'
import { CurseProjectTypes } from './types/models'
import type { IModInfo } from '~/shared/api/types/IModInfo'

export default (mod: ICurseMod | IModrMod, provider: 'curseforge' | 'modrinth'): IModInfo => {
  if (provider === 'curseforge') {
    const { id, slug, name, summary, downloadCount, logo, screenshots, classId } = mod as ICurseMod
    return {
      id,
      slug,
      title: name,
      downloads: downloadCount,
      logo: logo.url,
      gallery: screenshots.map((screenshot: any) => screenshot.url),
      description: summary,
      provider: 'curseforge',
      project_type: CurseProjectTypes[classId as unknown as keyof typeof CurseProjectTypes].toString(),
    }
  }

  else {
    const { slug, title, downloads, icon_url, gallery, description, project_type } = mod as IModrMod

    return {
      id: slug,
      slug,
      title,
      downloads,
      logo: icon_url,
      gallery,
      description,
      provider: 'modrinth',
      project_type,
    }
  }
}
