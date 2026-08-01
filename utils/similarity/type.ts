export type Article = {
	slug: string;
	title: string;
	content: string;
	articleHash: string;
};

export type Embedding = {
	slug: string;
	articleHash: string;
	embedding: number[];
};
