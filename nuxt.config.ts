// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@morev/vue-transitions/nuxt',
    '@nuxtjs/seo',
  ],
  css: ['@/app/global.css'],

  runtimeConfig: {
    public: {
      api: 'https://api.modrinth.com/v2',
    },
  },

  // Disable for a while
  typescript: {
    typeCheck: false,
  },

  imports: {
    dirs: [
      'shared/api',
      'shared/ui',
      'shared/config',
      // You can specify here any folder from which you want to auto-import
    ],
  },

  dir: {
    pages: 'routes',
  },

  site: {
    url: 'https://example.com',
    name: 'MC',
    description: 'The Minecraft modpack constructor in browser',
    defaultLocale: 'en',

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
