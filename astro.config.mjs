import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import expressiveCode, { astroExpressiveCode } from 'astro-expressive-code';
import icon from 'astro-icon';

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// https://astro.build/config
export default defineConfig(
	/** @type {import('astro').AstroUserConfig} */ {
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
			react(),
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
	},
);
