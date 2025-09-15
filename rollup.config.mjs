import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import dotenv from 'dotenv';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const target = process.env.BUILD_TARGET || 'app';
const outDir = 'dist';

const app = {
  input: 'src/app/index.tsx',
  output: {
    dir: outDir,
    format: 'esm',
    sourcemap: !isProd,
    entryFileNames: 'static/js/index.js',
    chunkFileNames: 'static/js/[name].js',
    assetFileNames: (info) =>
      /css$/i.test(info.name ?? '')
        ? 'static/css/index.css'
        : 'static/assets/[name][extname]',
  },
  plugins: [
    url({
      include: [
        '**/*.svg',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.gif',
        '**/*.webp',
      ],
      limit: 0,
      fileName: 'static/assets/[name]-[hash][extname]',
    }),
    resolve({
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    }),

    json(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development'
        ),
        'process.env.ACCESS_KEY': JSON.stringify(process.env.ACCESS_KEY || ''),
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL || ''),
      },
    }),
    postcss({
      autoModules: true,
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: isProd
          ? '[hash:base64:6]'
          : '[name]__[local]__[hash:base64:5]',
      },
      extract: 'static/css/index.css',
      minimize: isProd,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    copy({ targets: [{ src: 'public/*', dest: outDir }], copyOnce: true }),
    !isProd &&
      serve({ contentBase: outDir, historyApiFallback: true, port: 5173 }),
    !isProd && livereload({ watch: outDir }),
    isProd && terser(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
};

const lib = {
  input: 'src/lib/index.ts',
  output: [
    { file: 'lib/index.esm.js', format: 'esm', sourcemap: true },
    { file: 'lib/index.cjs', format: 'cjs', sourcemap: true, exports: 'named' },
  ],
  plugins: [
    resolve({ extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'] }),
    commonjs(),
    postcss({
      autoModules: true,
      extract: true,
      minimize: true,
    }),

    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
};

export default (() => {
  if (target === 'lib') return lib;
  if (target === 'app') return app;
  return [app, lib];
})();
