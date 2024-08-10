export interface ICurseVersion {
  id: number
  gameId: number
  modId: number
  isAvailable: boolean
  displayName: string
  fileName: string
  releaseType: number
  fileStatus: number
  hashes: FileHash[]
  fileDate: string // ISO 8601 date string
  fileLength: number
  downloadCount: number
  fileSizeOnDisk: number
  downloadUrl: string
  gameVersions: string[]
  sortableGameVersions: SortableGameVersion[]
  dependencies: Dependency[]
  exposeAsAlternative: boolean
  parentProjectFileId: number
  alternateFileId: number
  isServerPack: boolean
  serverPackFileId: number
  isEarlyAccessContent: boolean
  earlyAccessEndDate: string // ISO 8601 date string
  fileFingerprint: number
  modules: Module[]
}

interface FileHash {
  value: string
  algo: number
}

interface SortableGameVersion {
  gameVersionName: string
  gameVersionPadded: string
  gameVersion: string
  gameVersionReleaseDate: string // ISO 8601 date string
  gameVersionTypeId: number
}

interface Dependency {
  modId: number
  relationType: number
}

interface Module {
  name: string
  fingerprint: number
}
