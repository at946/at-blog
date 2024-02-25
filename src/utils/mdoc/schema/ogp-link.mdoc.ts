import { component } from '@astrojs/markdoc/config';

export const ogpLink = {
	render: component('/src/components/mdoc/OgpLink.astro'),
	attributes: {
		url: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
	},
};
