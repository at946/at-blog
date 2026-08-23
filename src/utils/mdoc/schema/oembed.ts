import { component } from '@astrojs/markdoc/config';

export const oembed = {
	render: component('/src/components/mdoc/Oembed.astro'),
	attributes: {
		url: {
			type: String,
			required: true,
		},
	},
};
