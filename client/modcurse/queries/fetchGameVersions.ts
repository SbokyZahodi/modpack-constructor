import $modr from '../$modr'

interface GameVersion {
  version: string
  version_type: string
  date: string
  major: boolean
}

export default () => {
  return $modr<GameVersion[]>('tag/game_version')
}
