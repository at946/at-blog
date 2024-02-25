import { component, nodes } from '@astrojs/markdoc/config';

export const image = {
	render: component('./src/components/mdoc/Image.astro'),
	attributes: {
		src: nodes.image.attributes?.src,
		alt: nodes.image.attributes?.alt,
		caption: {
			type: String,
			required: false,
		},
		srcUrl: {
			type: String,
			required: false,
		},
	},
};
