import fs from 'node:fs/promises';
import path from 'node:path';
import calculateCosineSimilarity from './calculateSimilarity';
import { SIMILAR_ARTICLE_COUNT, SIMILARITY_JSON_FILE_PATH } from './config';
import loadEmbeddings from './loadEmbeddings';
import type { ArticleEmbedding, Slug } from './type';

type SimilarArticle = {
	slug: Slug;
	score: number;
};

type ArticleSimilarity = {
	slug: Slug;
	similarArticles: SimilarArticle[];
};

const main = async () => {
	await fs.mkdir(path.dirname(SIMILARITY_JSON_FILE_PATH), { recursive: true });
	const articleEmbeddings: ArticleEmbedding[] = await loadEmbeddings();

	const similarityList: ArticleSimilarity[] = articleEmbeddings.map(
		(articleEmbedding) => {
			const similarity = articleEmbeddings
				.filter(
					(targetEmbedding) => targetEmbedding.slug !== articleEmbedding.slug,
				)
				.map((targetEmbedding) => ({
					slug: targetEmbedding.slug,
					score: calculateCosineSimilarity(
						articleEmbedding.embedding,
						targetEmbedding.embedding,
					),
				}))
				.filter((target) => target.score > 0.5)
				.sort((a, b) => b.score - a.score);

			const similarArticles = similarity.slice(0, SIMILAR_ARTICLE_COUNT);
			const differentPerspectiveArticles = similarity.slice(
				-(SIMILAR_ARTICLE_COUNT + 1),
			);

			return {
				slug: articleEmbedding.slug,
				similarArticles,
				differentPerspectiveArticles,
			};
		},
	);

	await fs.writeFile(
		SIMILARITY_JSON_FILE_PATH,
		JSON.stringify(similarityList, null, 2),
		'utf-8',
	);
};

main();
