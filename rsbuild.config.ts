import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV ?? 'development'
      ),
      'process.env.ACCESS_KEY': JSON.stringify(
        process.env.ACCESS_KEY ?? ''
      ),
      'process.env.BASE_URL': JSON.stringify(
        process.env.BASE_URL ?? 'https://api.unsplash.com'
      ),
    },
  },
  html: {
    title: 'sliderGallery',
    tags: [
      {
        tag: 'link',
        attrs: { rel: 'icon', href: '/icons.png' },
      },
    ],
  },
});
