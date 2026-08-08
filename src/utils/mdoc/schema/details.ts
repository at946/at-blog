import { component } from '@astrojs/markdoc/config';

export const details = {
	render: component('./src/components/mdoc/Details.astro'),
	attributes: {
		title: {
			type: String,
			required: false,
		},
	},
};
