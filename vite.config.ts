import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // Slidev 53's generated UnoCSS currently trips Vite 8's Lightning CSS
    // minifier. The browser receives the same styles without minification.
    cssMinify: false,
  },
})
