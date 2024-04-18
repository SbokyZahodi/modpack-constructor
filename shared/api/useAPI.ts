import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const defaults: UseFetchOptions<T> = {
    headers: {
      'User-Agent': 'https://github.com/SbokyZahodi/modpack-constructor',
    },
    server: false,
    $fetch: $api,
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
