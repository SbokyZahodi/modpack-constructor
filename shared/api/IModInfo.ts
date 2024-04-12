export interface IModInfo {
  client_side: string
  server_side: string
  game_versions: string[]
  id: string
  slug: string
  project_type: string
  team: string
  organization: null | string
  title: string
  description: string
  body: string
  body_url: null | string
  published: string
  updated: string
  approved: string
  queued: null | string
  status: string
  requested_status: null | string
  moderator_message: null | string
  license: {
    id: string
    name: string
    url: null | string
  }
  downloads: number
  followers: number
  categories: string[]
  additional_categories: string[]
  loaders: string[]
  versions: string[]
  icon_url: string
  issues_url: string
  source_url: string
  wiki_url: null | string
  discord_url: string
  donation_urls: DonationURL[]
  gallery: GalleryItem[]
  color: number
  thread_id: string
  monetization_status: string
}

interface DonationURL {
  id: string
  platform: string
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
