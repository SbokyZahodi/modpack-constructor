import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.api,
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
