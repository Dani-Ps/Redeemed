/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Redeemed/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Auto-update the app in the background when a new version is deployed.
      registerType: 'autoUpdate',
      // Copied as-is into the build (referenced from index.html / manifest).
      includeAssets: ['seed.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Redeemed · Cuidado emocional diario',
        short_name: 'Redeemed',
        description:
          'Guía diaria de salud emocional que une psicología basada en evidencia (TCC) con la fe cristiana.',
        lang: 'es',
        dir: 'ltr',
        // start_url / scope are derived from Vite `base` (/Redeemed/) by the plugin.
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#F7F4EF',
        background_color: '#F7F4EF',
        categories: ['health', 'lifestyle', 'medical'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: 'maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // SPA fallback so deep links (/ayuda, /historia…) work offline.
        navigateFallback: '/Redeemed/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
