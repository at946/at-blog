import type { NavItems } from './types';

export const NAV_ITEMS: NavItems = {
	home: {
		path: '/',
		title: 'home',
	},
	blog: {
		path: '/blog',
		title: 'blog',
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
	github: 'at946',
};

export const PAGE_SIZE = 10;
