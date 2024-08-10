import type { IModInfo } from '~/shared/api/types/IModInfo'

export default () => {
  const project = useState<IModInfo | null>('mod-versions-modal', () => null)

  function showProjectVersions(mod: IModInfo) {
    project.value = mod
  }

  return {
    project,
    showProjectVersions,
  }
}
