// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  imports: {
    dirs: ['composables/**', 'utils/**']
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/404.html']
    }
  },
  supabase: {
    redirect: false,
    cookieOptions: {
      domain: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DOMAIN : undefined
    }
  }
})
