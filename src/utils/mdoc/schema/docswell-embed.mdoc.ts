import { component } from "@astrojs/markdoc/config";

export const docswellEmbed = {
	render: component("./src/components/mdoc/DocswellEmbed.astro"),
	attributes: {
		src: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		href: {
			type: String,
			required: true,
		},
	},
};
