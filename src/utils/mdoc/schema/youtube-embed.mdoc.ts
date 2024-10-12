import { component } from '@astrojs/markdoc/config';

export const youtubeEmbed = {
	render: component('./src/components/mdoc/YouTubeEmbed.astro'),
	attributes: {
		src: {
			type: String,
			required: true,
		},
	},
};
