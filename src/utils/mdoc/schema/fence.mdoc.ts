import { component } from "@astrojs/markdoc/config";

export const fence = {
	render: component("./src/components/mdoc/Fence.astro"),
	attributes: {
		content: {
			type: String,
			required: true,
		},
		language: {
			type: String,
		},
	},
};
