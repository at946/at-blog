import { docswellEmbed } from './schema/docswell-embed.mdoc';
import { fence } from './schema/fence.mdoc';
import { imageWrapper } from './schema/image-wrapper.mdoc';
import { inlineMath } from './schema/inline-math.mdoc';
import { linkCard } from './schema/link-card.mdoc';
import { link } from './schema/link.mdoc';
import { math } from './schema/math.mdoc';
import { quote } from './schema/quote.mdoc';
import { slideshareEmbed } from './schema/slideshare-embed.mdoc';
import { speakerdeckEmbed } from './schema/speakerdeck-embed.mdoc';

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
		linkCard,
	},
};
