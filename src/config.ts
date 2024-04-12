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
	domain: 'at-blog.vercel.app',
	image: '/ogp.png',
	githubUrl: 'https://github.com/at946',
	listDrafts: true,
	author: 'asato',
	xAccountOfAuthor: 'at_946',
	blueskyAccountOfAuthor: 'at946.bsky.social',
};

export const PAGE_SIZE = 10;
