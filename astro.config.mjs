// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://daniel.hendersonede.com',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap(), react()],
  redirects: {
    '/article': '/articles',
    '/tool': '/tools'
  }
});