import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { imgToPicture as htmlImgToPicture } from './plugins/htmlImgToPicture.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
 base: '/Workout-Tracker/',
 build: {
  assetsDir: 'assets',
  rollupOptions: {
   output: {
    assetFileNames: assetInfo => {
     const name = assetInfo.name || ''
     const ext = name.split('.').pop()?.toLowerCase() || ''

     if (/(woff2?|ttf|otf|eot)$/i.test(ext)) {
      return 'assets/fonts/[name]-[hash][extname]'
     }

     if (/(png|jpe?g|gif|svg|webp|avif)$/i.test(ext)) {
      return 'assets/images/[name]-[hash][extname]'
     }

     if (/(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(ext)) {
      return 'assets/media/[name]-[hash][extname]'
     }

     return 'assets/[name]-[hash][extname]'
    },
   },
  },
 },
 resolve: {
  alias: {
   '@': path.resolve(__dirname, './src'),
  },
 },
 css: {
  preprocessorOptions: {
   scss: {
    includePaths: ['src/scss', 'src/scss/components'],
   },
  },
 },
 plugins: [
  ViteImageOptimizer({
   png: { quality: 80, compressionLevel: 8 },
   jpeg: { quality: 80, progressive: true },
   webp: { quality: 80 },
   avif: { quality: 80 },
   includePublic: false,
  }),
  htmlImgToPicture({
   formats: ['webp', 'avif'],
   quality: 80,
   isRetinaSupport: true,
   lazyLoading: true,
  }),
  createSvgIconsPlugin({
   iconDirs: [path.resolve(process.cwd(), 'src/images/icons')],
   symbolId: 'icon-[name]',
   svgoOptions: {
    plugins: [
     { name: 'removeDoctype', active: true },
     { name: 'removeXMLProcInst', active: true },
     { name: 'removeComments', active: true },
     { name: 'removeMetadata', active: true },
     { name: 'removeTitle', active: true },
     { name: 'removeDesc', active: true },
     {
      name: 'removeAttrs',
      params: { attrs: ['fill', 'stroke', 'style', 'class', 'data-name'] },
     },
     { name: 'removeDimensions', active: true },
     { name: 'removeViewBox', active: false },
     { name: 'convertShapeToPath', active: true },
     { name: 'mergePaths', active: true },
     { name: 'convertColors', params: { currentColor: true } },
     { name: 'cleanupIDs', active: true },
     { name: 'removeUselessDefs', active: true },
    ],
   },
  }),
 ],
})
