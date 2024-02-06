import shiki from '@astrojs/markdoc/shiki';
import { link } from "./schema/link.mdoc";
import { quote } from "./schema/quote.mdoc";
import { image } from "./schema/image.mdoc";
import { speakerdeckEmbed } from "./schema/speakerdeck-embed.mdoc";
import { docswellEmbed } from "./schema/docswell-embed.mdoc";
import { slideshareEmbed } from './schema/slideshare-embed.mdoc';
import { fence } from './schema/fence.mdoc';

export const config = {
	nodes: {
		link,
		fence,
	},
	tags: {
		quote,
		image,
		speakerdeck: speakerdeckEmbed,
		docswell: docswellEmbed,
		slideshare: slideshareEmbed,
	},
};
