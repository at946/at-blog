// import { generateEmbedding } from './generateEmbedding';

import fs from 'node:fs/promises';
import path from 'node:path';
import { EMBEDDINGS_FILE_PATH } from './config';
import filterChangedArticles from './filterChangedArticles';
import generateEmbedding from './generateEmbedding';
import loadEmbeddings from './loadEmbeddings';
import prepareArticles from './prepareArticles';
import type { Article, Embedding } from './type';

const main = async () => {
	await fs.mkdir(path.dirname(EMBEDDINGS_FILE_PATH), { recursive: true });
	const articles: Article[] = await prepareArticles();
	const embeddings: Embedding[] = await loadEmbeddings();
	const targetArticles: Article[] = filterChangedArticles(articles, embeddings);

	const embeddingMap: Map<string, Embedding> = new Map(
		embeddings.map((embedding) => [embedding.slug, embedding]),
	);

	try {
		for (const [index, article] of targetArticles.entries()) {
			console.log(`[${index}/${targetArticles.length}] ${article.slug}`);
			const embedding: Embedding = await generateEmbedding(article);
			embeddingMap.set(article.slug, embedding);
		}
	} finally {
		await fs.writeFile(
			EMBEDDINGS_FILE_PATH,
			JSON.stringify([...embeddingMap.values()], null, 2),
			'utf-8',
		);
	}
};

main();
