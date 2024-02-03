import type { NavItems } from "./types";

export const NAV_ITEMS: NavItems = {
	home: {
		path: "/",
		title: "home",
	},
	blog: {
		path: "/blog",
		title: "blog",
	},
	tags: {
		path: "/tags",
		title: "tags",
	},
};

export const SITE = {
	// Your site's detail?
	name: "at blog",
	title: "at blog",
	description: "こんにちは、asatoです。ゆっくりブログを書いています。",
	url: "https://at-blog.vercel.com",
	githubUrl: "https://github.com/at946",
	listDrafts: true,
	author: "asato",
	authorTwitter: "at_946",
};

// Ink - Theme configuration
export const PAGE_SIZE = 10;