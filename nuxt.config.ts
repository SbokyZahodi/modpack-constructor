// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@nuxt/ui', '@nuxt/image', 'nuxt-swiper'],
  css: ['@/app/global.css'],

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'https://api.modrinth.com/v2',
    },
  },

  imports: {
    dirs: [
      'shared/composables',
      'shared/utils',
      'shared/types',
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
