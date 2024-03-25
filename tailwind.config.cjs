/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

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
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.text'),
						'--tw-prose-invert-body': theme('colors.dark.text'),
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
