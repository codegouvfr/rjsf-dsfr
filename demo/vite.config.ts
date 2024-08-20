import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const alias: Record<string, string> = {}

// add local path in development to make vite use sources directly avoiding build step
if (process.env.NODE_ENV !== 'production') {
  alias['@codegouvfr/rjsf-dsfr'] = path.resolve(__dirname, '../src')
}

// https://vitejs.dev/config/
export default defineConfig({
  // base needs to be changed for links to work in GitHub pages
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  server: {
    port: 8080,
    open: process.env.NODE_ENV !== 'production',
  }, // maintain the old webpack behavior in dev
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // '@rjsf/core',
        // '@rjsf/utils',
        // '@rjsf/validator-ajv8',
        // '@rjsf/bootstrap-4',
      ],
      plugins: [nodeResolve()],
    },
  },
  resolve: {
    preserveSymlinks: true, // Fixes https://github.com/rjsf-team/react-jsonschema-form/issues/3228
    alias,
  },
})
