import { component } from "@astrojs/markdoc/config";
import { SITE } from '@/config'

export const link = {
	render: component("./src/components/mdoc/Link.astro"),
	children: ["strong", "em", "s", "code", "text", "tag"],
	attributes: {
		href: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		}
	},
};
