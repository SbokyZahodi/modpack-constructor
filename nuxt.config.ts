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
      baseUrl: 'https://modpack-constructor.vercel.app',
    },
  },

  // Disable for a while
  typescript: {
    typeCheck: false,
  },

  imports: {
    dirs: [
      'shared/*',
      // Auto-import all files from shared directory.
    ],

  },

  dir: {
    pages: 'app/routes',
  },

  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },

  site: {
    url: 'https://modpack-constructor.vercel.app',
    name: 'MC | The Minecraft modpack constructor',
    description: 'The Minecraft modpack constructor in browser powered by Modrinth',
    defaultLocale: 'en',
  },

  components: [
    {
      path: '~/shared',
      pathPrefix: false,
    },
  ],

})
