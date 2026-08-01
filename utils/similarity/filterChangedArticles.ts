import type { EmbeddedArticle, PreparedArticle } from './type';

const filterChangedArticles = (
	preparedArticles: PreparedArticle[],
	embeddedArticles: EmbeddedArticle[],
): PreparedArticle[] => {
	const embeddedArticleMap = new Map(
		embeddedArticles.map((article) => [article.slug, article.articleHash]),
	);

	return preparedArticles.filter((article) => {
		return embeddedArticleMap.get(article.slug) !== article.articleHash;
	});
};

export default filterChangedArticles;
