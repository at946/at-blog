import { component } from '@astrojs/markdoc/config';

export const linkCard = {
	render: component('/src/components/mdoc/LinkCard.astro'),
	attributes: {
		name: {
			type: String,
			required: true,
		},
		href: {
			type: String,
			required: true,
		},
		imageSrc: {
			type: String,
			required: false,
		},
		imageAlt: {
			type: String,
			required: false,
		},
	},
};
