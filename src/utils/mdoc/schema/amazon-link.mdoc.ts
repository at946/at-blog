import { component } from '@astrojs/markdoc/config';

export const amazonLink = {
	render: component('/src/components/mdoc/AmazonLink.astro'),
	attributes: {
		asin: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
	},
};
