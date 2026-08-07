export type Slug = string;
export type Embedding = number[];

export type Article = {
	slug: Slug;
	title: string;
	content: string;
	articleHash: string;
};

export type ArticleEmbedding = {
	slug: Slug;
	title: string;
	articleHash: string;
	embedding: Embedding;
};
