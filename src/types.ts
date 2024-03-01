export type NavItems = {
	[key: string]: NavItem;
};

export type NavItem = {
	path: string;
	title: string;
};

export type amazonItem = {
	asin: string;
	url: string;
	imageUrl: string;
	title: string;
	contributors: string;
	publisher: string;
};
