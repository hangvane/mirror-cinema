import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import { resolve } from 'path';
import ViteComponents from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import { antVueToc } from './build/antVueToc';
import { antVueMD } from './build/antVueMD';
import * as pkg from './package.json';

const __APP_INFO__ = { name: pkg.name, version: pkg.version };

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      builders: [
        antVueMD(),
        antVueToc({ sfcPath: './build/mdTocTemplate.vue' }),
      ],
      markdownItOptions: {
        // html: false,
        xhtmlOut: true,
        typographer: true,
      },
      markdownItUses: [[anchor], [markdownItTocDoneRight]],
    }),
    ViteComponents({
      resolvers: [AntDesignVueResolver()],
    }),
    createHtmlPlugin({ minify: true }),
    visualizer(),
  ],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
});
