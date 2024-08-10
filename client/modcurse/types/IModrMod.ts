export interface IModrMod {
  slug: string
  title: string
  description: string
  categories: string[]
  client_side: string
  server_side: string
  body: string
  status: string
  requested_status: string
  additional_categories: string[]
  issues_url: string
  source_url: string
  wiki_url: string
  discord_url: string
  donation_urls: DonationUrl[]
  project_type: string
  downloads: number
  icon_url: string
  color: number
  thread_id: string
  monetization_status: string
  id: string
  team: string
  body_url: string | null
  moderator_message: string | null
  published: string
  updated: string
  approved: string
  queued: string
  followers: number
  license: License
  versions: string[]
  game_versions: string[]
  loaders: string[]
  gallery: GalleryItem[]
}

interface DonationUrl {
  id: string
  platform: string
  url: string
}

interface License {
  id: string
  name: string
  url: string
}

interface GalleryItem {
  url: string
  featured: boolean
  title: string
  description: string
  created: string
  ordering: number
}
