export interface IModrVersion {
  name: string
  version_number: string
  changelog: string
  dependencies: Dependency[]
  game_versions: string[]
  version_type: string
  loaders: string[]
  featured: boolean
  status: string
  requested_status: string
  id: string
  project_id: string
  author_id: string
  date_published: string
  downloads: number
  changelog_url: string | null
  files: File[]
}

interface Dependency {
  version_id: string
  project_id: string
  file_name: string
  dependency_type: string
}

interface FileHash {
  sha512: string
  sha1: string
}

interface File {
  hashes: FileHash
  url: string
  filename: string
  primary: boolean
  size: number
  file_type: string
}
