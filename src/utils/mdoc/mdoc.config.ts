import { link } from "./schema/link.mdoc";
import { quote } from "./schema/quote.mdoc";
import { image } from "./schema/image.mdoc";
import { speakerdeckEmbed } from "./schema/speakerdeck-embed.mdoc";
import { docswellEmbed } from "./schema/docswell-embed.mdoc";

export const config = {
	nodes: {
		link,
	},
	tags: {
		quote,
		image,
		speakerdeck: speakerdeckEmbed,
		docswell: docswellEmbed,
	},
};
