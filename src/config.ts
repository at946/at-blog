import type { NavItems } from './types';

export const NAV_ITEMS: NavItems = {
	home: {
		path: '/',
		title: 'home',
	},
	blog: {
		path: '/blog',
		title: 'Posts',
	},
};

export const SITE = {
	name: 'at-blog',
	title: 'at-blog',
	description: 'こんにちは、asatoです。ゆっくりブログを書いています。',
	url: 'https://at-blog.vercel.app',
	image: '/ogp.png',
};

export const ACCOUNTS = {
	x: 'at_946',
	bluesky: 'at946.bsky.social',
};

export const PROFILE_PAGE_URLS = {
	x: `https://twitter.com/${ACCOUNTS.x}`,
	bluesky: `https://bsky.app/profile/${ACCOUNTS.bluesky}`,
	github: 'https://github.com/at946',
	bmc: 'https://www.buymeacoffee.com/at946',
};

export const PAGE_SIZE = 10;
