import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

import expressiveCode, { astroExpressiveCode } from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig(
	/** @type {import('astro').AstroUserConfig} */ {
		output: 'server',
		site: 'https://at-blog.vercel.app',
		// Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
		server: {
			// port: 4321, // The port to run the dev server on.
		},
		integrations: [
			astroExpressiveCode(),
			markdoc(),
			svelte(),
			tailwind({
				applyBaseStyles: false,
			}),
			icon(),
			sitemap(),
			partytown({
				config: {
					forward: ['dataLayer.push'],
				},
			}),
		],
		vite: {
			plugins: [],
			resolve: {
				alias: {
					$: path.resolve(__dirname, './src'),
				},
			},
			optimizeDeps: {
				allowNodeBuiltins: true,
			},
		},
		adapter: vercel(),
	},
);
