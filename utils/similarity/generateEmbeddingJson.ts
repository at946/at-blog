import fs from 'node:fs/promises';
import path from 'node:path';
import calculateEmbedding from './calculateEmbedding';
import { EMBEDDINGS_JSON_FILE_PATH } from './config';
import filterChangedArticles from './filterChangedArticles';
import loadEmbeddings from './loadEmbeddings';
import prepareArticles from './prepareArticles';
import type { Article, ArticleEmbedding } from './type';

const main = async () => {
	await fs.mkdir(path.dirname(EMBEDDINGS_JSON_FILE_PATH), { recursive: true });
	const articles: Article[] = await prepareArticles();
	const articleEmbeddings: ArticleEmbedding[] = await loadEmbeddings();
	const targetArticles: Article[] = filterChangedArticles(
		articles,
		articleEmbeddings,
	);

	if (targetArticles.length === 0) {
		console.log('No article need to be recalculated.');
		return;
	}

	const articleEmbeddingMap: Map<string, ArticleEmbedding> = new Map(
		articleEmbeddings.map((embedding) => [embedding.slug, embedding]),
	);

	try {
		for (const [index, article] of targetArticles.entries()) {
			console.log(`[${index + 1}/${targetArticles.length}] ${article.slug}`);
			const articleEmbedding: ArticleEmbedding =
				await calculateEmbedding(article);
			articleEmbeddingMap.set(article.slug, articleEmbedding);
		}
	} finally {
		await fs.writeFile(
			EMBEDDINGS_JSON_FILE_PATH,
			JSON.stringify([...articleEmbeddingMap.values()], null, 2),
			'utf-8',
		);
	}
};

main();
