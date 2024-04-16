import { defineConfig } from 'vite'
import utools from '@qc2168/vite-plugin-utools'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        $: path.resolve(__dirname, './libs'),
        types: path.resolve(__dirname, './types')
      }
    },

    build: {
      chunkSize: 'none',
      manifest: false,
      rollupOptions: {
        output: {
          // 重点在这里哦
          // entryFileNames: `assets/[name].${timestamp}.js`,
          // chunkFileNames: `assets/[name].${timestamp}.js`,
          // assetFileNames: `assets/[name].${timestamp}.[ext]`
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    },

    plugins: [
      vue(),
      utools({
        entry: [{ entry: 'libs/preload.ts' }]
        // hmr: {
        //   pluginJsonPath: './plugin.json'
        // },
        // upx: {
        //   pluginJsonPath: './plugin.json'
        // }
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ArcoResolver()]
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      })
    ],
    server: {
      host: pkg.env.VITE_DEV_SERVER_HOST,
      port: pkg.env.VITE_DEV_SERVER_PORT
    }
  }
})
