import type { Article, ArticleEmbedding } from './type';

const filterChangedArticles = (
	articles: Article[],
	articleEmbeddings: ArticleEmbedding[],
): Article[] => {
	const articleEmbeddingMap = new Map(
		articleEmbeddings.map((articleEmbedding) => [
			articleEmbedding.slug,
			articleEmbedding.articleHash,
		]),
	);

	return articles.filter((article) => {
		return articleEmbeddingMap.get(article.slug) !== article.articleHash;
	});
};

export default filterChangedArticles;
