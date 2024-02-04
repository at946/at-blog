import { component } from "@astrojs/markdoc/config";

export const outerLink = {
	render: component("./src/components/mdoc/OuterLink.astro"),
	children: ["strong", "em", "s", "code", "text", "tag"],
	attributes: {
		href: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		},
	},
};
