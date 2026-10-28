import { amazonLink } from './schema/amazon-link.mdoc';
import { details } from './schema/details.mdoc';
import { docswellEmbed } from './schema/docswell-embed.mdoc';
import { fence } from './schema/fence.mdoc';
import { image } from './schema/image.mdoc';
import { inlineMath } from './schema/inline-math.mdoc';
import { link } from './schema/link.mdoc';
import { linkCard } from './schema/link-card.mdoc';
import { math } from './schema/math.mdoc';
import { ogpLink } from './schema/ogp-link.mdoc';
import { quote } from './schema/quote.mdoc';
import { slideshareEmbed } from './schema/slideshare-embed.mdoc';
import { speakerdeckEmbed } from './schema/speakerdeck-embed.mdoc';
import { tableOfContents } from './schema/table-of-contents.mdoc';
import { youtubeEmbed } from './schema/youtube-embed.mdoc';

export const config = {
	nodes: {
		fence,
		link,
	},
	tags: {
		amazonLink,
		details,
		docswell: docswellEmbed,
		toc: tableOfContents,
		image,
		inlineMath,
		linkCard,
		math,
		ogpLink,
		quote,
		slideshare: slideshareEmbed,
		speakerdeck: speakerdeckEmbed,
		youtube: youtubeEmbed,
	},
};
