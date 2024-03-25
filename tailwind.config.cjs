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
			bg: {
				pre: '#24292e',
			},
		},
		extend: {
			typography: (theme) => ({
				dark: {
					css: {
						code: {
							backgroundColor: theme('colors.slate.700'),
						},
						'pre code': {
							backgroundColor: colors.inherit,
						},
					},
				},
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.text'),
						'--tw-prose-bullets': theme('colors.text'),
						'--tw-prose-invert-body': theme('colors.dark.text'),
						'--tw-prose-invert-bullets': theme('colors.dark.text'),
						code: {
							backgroundColor: theme('colors.slate.300'),
							borderRadius: theme('borderRadius.DEFAULT'),
							paddingTop: theme('spacing.[0.5]'),
							paddingBottom: theme('spacing.[0.5]'),
							paddingLeft: theme('spacing.[1.5]'),
							paddingRight: theme('spacing.[1.5]'),
						},
						'code::before': {
							content: 'none',
						},
						'code::after': {
							content: 'none',
						},
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
