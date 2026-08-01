export type PreparedArticle = {
	slug: string;
	title: string;
	content: string;
	articleHash: string;
};

export type EmbeddedArticle = Omit<PreparedArticle, 'content'> & {
	embedding: number[];
};
