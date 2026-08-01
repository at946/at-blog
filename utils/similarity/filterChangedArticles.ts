import type { Article, Embedding } from './type';

const filterChangedArticles = (
	articles: Article[],
	embeddings: Embedding[],
): Article[] => {
	const EmbeddingMap = new Map(
		embeddings.map((embedding) => [embedding.slug, embedding.articleHash]),
	);

	return articles.filter((article) => {
		return EmbeddingMap.get(article.slug) !== article.articleHash;
	});
};

export default filterChangedArticles;
