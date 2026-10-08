import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    {
      name: 'landing-page-prerender',
      transformIndexHtml: {
        order: 'pre',
        async handler(html, context) {
          if (!context.server) return html;
          const { render } = await context.server.ssrLoadModule('/src/entry-server.jsx');
          return html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`);
        },
      },
    },
  ],
  build: {
    ssrEmitAssets: true,
    copyPublicDir: !isSsrBuild,
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
}))
