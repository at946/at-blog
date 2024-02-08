import shiki from "@astrojs/markdoc/shiki";
import { link } from "./schema/link.mdoc";
import { quote } from "./schema/quote.mdoc";
import { imageWrapper } from "./schema/image-wrapper.mdoc";
import { speakerdeckEmbed } from "./schema/speakerdeck-embed.mdoc";
import { docswellEmbed } from "./schema/docswell-embed.mdoc";
import { slideshareEmbed } from "./schema/slideshare-embed.mdoc";
import { fence } from "./schema/fence.mdoc";
import { math } from "./schema/math.mdoc";
import { inlineMath } from "./schema/inline-math.mdoc";

export const config = {
	nodes: {
		link,
		fence,
	},
	tags: {
		quote,
		imageWrapper,
		math,
		inlineMath,
		speakerdeck: speakerdeckEmbed,
		docswell: docswellEmbed,
		slideshare: slideshareEmbed,
	},
};
