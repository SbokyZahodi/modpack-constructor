import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.api,
    headers: {
      'User-Agent': 'https://github.com/SbokyZahodi/modpack-constructor',
    },
    server: false,
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
