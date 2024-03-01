import { component } from '@astrojs/markdoc/config';

export const quote = {
	render: component('./src/components/mdoc/Quote.astro'),
	children: ['strong', 'em', 's', 'code', 'text', 'tag'],
	attributes: {
		citeName: {
			type: String,
			required: false,
		},
		citeUrl: {
			type: String,
			required: false,
		},
		amazonAsin: {
			type: String,
			required: false,
		},
	},
};
