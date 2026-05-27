import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode, { astroExpressiveCode } from 'astro-expressive-code';
import icon from 'astro-icon';

const markdocMath = () => ({
	name: 'markdoc-math',
	enforce: 'pre',
	transform(code, id) {
		if (!id.endsWith('.mdoc')) return;
		const codeBlocks = [];
		let transformed = code.replace(/(```[\s\S]*?```|`[\s\S]*?`)/g, (match) => {
			codeBlocks.push(match);
			return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
		});
		// Display math: $$ ... $$
		transformed = transformed.replace(
			/(?<!\\)\$\$\s*([\s\S]+?)\s*(?<!\\)\$\$/g,
			(_match, formula) => {
				return `{% math formula=${JSON.stringify(formula.trim())} /%}`;
			},
		);
		// Inline math: $ ... $
		transformed = transformed.replace(
			/(?<!\\)\$([^\s$](?:[^$]*[^\s$])?)(?<!\\)\$/g,
			(_match, formula) => {
				return `{% inlineMath formula=${JSON.stringify(formula.trim())} /%}`;
			},
		);
		transformed = transformed.replace(
			/__CODE_BLOCK_(\d+)__/g,
			(_match, index) => {
				return codeBlocks[parseInt(index)];
			},
		);
		return { code: transformed, map: null };
	},
});

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// https://astro.build/config
export default defineConfig(
	/** @type {import('astro').AstroUserConfig} */ {
		site: 'https://at-blog.vercel.app',
		output: 'static',
		// Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
		server: {
			// port: 4321, // The dev server port.
		},
		integrations: [
			astroExpressiveCode(),
			markdoc(),
			svelte(),
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
			plugins: [tailwindcss(), markdocMath()],
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
