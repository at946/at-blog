import { component } from "@astrojs/markdoc/config";
import { SITE } from '@/config'

export const image = {
	render: component("./src/components/mdoc/Image.astro"),
	attributes: {
		src: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		},
		sourceName: {
			type: String,
		},
		sourceLink: {
			type: String,
		},
	},
};
