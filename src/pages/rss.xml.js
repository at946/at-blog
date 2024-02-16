import rss from '@astrojs/rss';
import { SITE } from '../config';
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const sortedPosts = Object.values(allPosts).sort(
	(a, b) =>
		new Date(b.data.publicationDate).valueOf() -
		new Date(a.data.publicationDate).valueOf(),
);

export const GET = () =>
	rss({
		// `<title>` field in output xml
		title: `${SITE.name} | Blog`,
		// `<description>` field in output xml
		description: SITE.description,
		// base URL for RSS <item> links
		// SITE will use "site" from your project's astro.config.
		site: import.meta.env.SITE,
		// list of `<item>`s in output xml
		// simple example: generate items for every md file in /src/pages
		// see "Generating items" section for required frontmatter and advanced use cases
		items: sortedPosts.map((item) => ({
			title: item.data.title,
			link: `blog/${item.slug}`,
			pubDate: new Date(item.data.publicationDate),
		})),
		// (optional) inject custom xml
		customData: '<language>ja-jp</language>',
	});
