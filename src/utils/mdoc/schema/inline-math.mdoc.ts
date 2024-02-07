import { component } from "@astrojs/markdoc/config";

export const inlineMath = {
	render: component("./src/components/mdoc/InlineMath.astro"),
	attributes: {
		formula: {
			type: String,
		},
	},
};
