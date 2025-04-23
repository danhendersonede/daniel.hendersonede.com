// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://daniel.hendersonede.com',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap(), react()],

  redirects: {
    '/article': '/articles',
    '/tool': '/tools'
  },

  adapter: netlify({
    imageCDN: false,
  }),
});