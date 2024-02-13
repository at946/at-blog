import { component } from '@astrojs/markdoc/config';

export const math = {
	render: component('./src/components/mdoc/Math.astro'),
	attributes: {
		formula: {
			type: String,
		},
	},
};
