import { component } from '@astrojs/markdoc/config';

export const slideshareEmbed = {
	render: component('./src/components/mdoc/SlideShareEmbed.astro'),
	attributes: {
		src: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		},
		slideHref: {
			type: String,
		},
		width: {
			type: Number,
		},
		height: {
			type: Number,
		},
		author: {
			type: String,
		},
		authorHref: {
			type: String,
		},
	},
};
