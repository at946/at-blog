import { callout } from "./schema/callout.mdoc";
import { link } from "./schema/link.mdoc";
import { outerLink } from './schema/outer-link.mdoc';
import { tweetEmbed } from "./schema/tweet-embed.mdoc";
import { tabs } from "./schema/tabs.mdoc";
import { ytEmbed } from "./schema/yt-embed.mdoc";
import { speakerdeckEmbed } from "./schema/speakerdeck-embed.mdoc";
import { quote } from "./schema/quote.mdoc";
import { image } from "./schema/image.mdoc";

export const config = {
	nodes: {
		link,
	},
	tags: {
		callout,
		link,
		outerLink,
		tweet: tweetEmbed,
		yt: ytEmbed,
		tabs,
		speakerdeck: speakerdeckEmbed,
		quote,
		image,
	},
};
