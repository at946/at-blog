import { component } from "@astrojs/markdoc/config";

export const speakerdeckEmbed = {
	render: component("./src/components/mdoc/SpeakerDeckEmbed.astro"),
	attributes: {
		id: {
			type: String,
			required: true,
		},
		slide: {
			type: Number,
		},
	},
};
