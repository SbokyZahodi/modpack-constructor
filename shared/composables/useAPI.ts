import type { AsyncData, UseFetchOptions } from '#app'

export async function useAPI<T>(path: string, options?: UseFetchOptions<any>) {
  const config = useRuntimeConfig()

  return await useFetch(() => `${config.public.BASE_URL}/${path}`, options) as AsyncData<T, any>
}
