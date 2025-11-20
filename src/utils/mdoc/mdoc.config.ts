import { amazonLink } from '@/utils/mdoc/schema/amazon-link.mdoc';
import { docswellEmbed } from '@/utils/mdoc/schema/docswell-embed.mdoc';
import { tableOfContents } from '@/utils/mdoc/schema/table-of-contents.mdoc';
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
import { youtubeEmbed } from './schema/youtube-embed.mdoc';

export const config = {
	nodes: {
		fence,
		link,
	},
	tags: {
		amazonLink,
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
