/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const config = require('./tailwind.theme.config.cjs');
const themeConfig =
	process.env.THEME_KEY && config[process.env.THEME_KEY]
		? config[process.env.THEME_KEY]
		: config.default;
const { colors1 } = themeConfig;

module.exports = {
	darkMode: 'class',
	content: ['./public/**/*.html', './src/**/*.{astro,js,ts,jsx,tsx}'],
	safelist: ['dark'],
	theme: {
		colors: {
			...colors,
			primary: colors.teal['500'],
			text: colors.gray['600'],
			link: colors.teal['500'],
			dark: {
				text: colors.gray['200'],
			},
		},
		extend: {
			typography: (theme) => ({
				dark: {
					// css: {
					// 	blockquote: {
					// 		color: colors1.dark.secondary,
					// 		borderColor: colors1.dark.secondary,
					// 	},
					// 	code: {
					// 		color: colors.gray['100'],
					// 	},
					// 	h1: {
					// 		color: colors1.dark.primary,
					// 	},
					// 	h2: {
					// 		color: colors1.dark.secondary,
					// 	},
					// },
				},
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.text'),
						'--tw-prose-invert-body': theme('colors.dark.text'),
						// blockquote: {
						// 	color: colors1.secondary,
						// 	borderColor: colors1.secondary,
						// },
						// 'blockquote p:first-of-type::before': { content: 'none' },
						// 'blockquote p:first-of-type::after': { content: 'none' },
						// 'blockquote p': { marginBottom: 0 },
						// code: {
						// 	letterSpacing: '0',
						// 	color: colors.gray['600'],
						// },
						// h1: {
						// 	color: colors1.primary,
						// },
						// h2: {
						// 	color: colors1.secondary,
						// },
					},
				},
			}),
		},
	},
	variants: {
		extend: { typography: ['dark'] },
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
};
