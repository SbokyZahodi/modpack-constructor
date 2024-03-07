// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@nuxt/ui', '@nuxt/image'],
  css: ['@/app/global.css'],

  runtimeConfig: {
    public: {
      api: 'https://api.modrinth.com/v2',
    },
  },

  imports: {
    dirs: [
      'shared/composables',
      'shared/utils',
      'shared/types',
      'shared/fetchers',
      // You can specify here any folder from which you want to auto-import
    ],
  },

  dir: {
    pages: 'routes',
  },

  components: {
    dirs: [
      {
        path: '~/shared/components',
        pathPrefix: false,
      },

    ],
  },

})
