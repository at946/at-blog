const config = require('./tailwind.theme.config.cjs');
const themeConfig =
	process.env.THEME_KEY && config[process.env.THEME_KEY]
		? config[process.env.THEME_KEY]
		: config.default;
const { colors } = themeConfig;
module.exports = {
	darkMode: 'class',
	content: ['./public/**/*.html', './src/**/*.{astro,js,ts,jsx,tsx}'],
	safelist: ['dark'],
	theme: {
		extend: {
			colors: {
				theme: {
					...colors,
				},
			},
			typography: (theme) => ({
				dark: {
					css: {
						color: theme('colors.gray.100'),
						blockquote: {
							color: colors.dark.secondary,
							borderColor: colors.dark.secondary,
						},
						code: {
							color: theme('colors.gray.100'),
						},
						h1: {
							color: colors.dark.primary,
						},
						h2: {
							color: colors.dark.secondary,
						},
					},
				},
				DEFAULT: {
					css: {
						a: {
							color: colors.dark.primary,
							'&:hover': {
								color: colors.primary,
							},
						},
						blockquote: {
							color: colors.secondary,
							borderColor: colors.secondary,
						},
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' },
						'blockquote p': { marginBottom: 0 },
						code: {
							letterSpacing: '0',
							color: theme('colors.gray.600'),
						},
						h1: {
							color: colors.primary,
						},
						h2: {
							color: colors.secondary,
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
