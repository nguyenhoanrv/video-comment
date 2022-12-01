// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    resolve: {
      alias: [
        { find: './runtimeConfig', replacement: './runtimeConfig.browser' },
      ],
    },
    define: {
      'window.global': {},
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  css: ['~/assets/css/main.css'],
})
