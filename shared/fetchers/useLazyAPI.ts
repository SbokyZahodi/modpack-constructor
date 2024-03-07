import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export function useLazyAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.api,
    server: false,
    immediate: false,
    onRequest: ({ request, options }) => {
      if (request.toString().includes('null') || request.toString().includes('undefined'))
        options.signal.aborted = true
    },
  }

  const params = defu(options, defaults)

  return useLazyFetch(url, params)
}
