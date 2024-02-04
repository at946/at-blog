import { component } from "@astrojs/markdoc/config";
import { SITE } from '@/config'

export const quote = {
	render: component("./src/components/mdoc/Quote.astro"),
	children: ["strong", "em", "s", "code", "text", "tag"],
	attributes: {
		sourceName: {
			type: String,
		},
		sourceLink: {
			type: String,
		},
	},
};
