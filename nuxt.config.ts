// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
      'vuetify/lib/styles/main.sass',
      '@mdi/font/css/materialdesignicons.min.css',
      '~/assets/style/global.scss'
  ],
  modules: [
    '@nuxt/content',
    '@pinia/nuxt'
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  nitro: {
    preset: 'service-worker'
  },
  app: {
    baseURL: "/tmhelper"
  },
})
