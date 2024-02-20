import { component } from '@astrojs/markdoc/config';

export const linkCard = {
	render: component('/src/components/mdoc/LinkCard.astro'),
	attributes: {
		url: {
			type: String,
			required: true,
		},
	},
};
