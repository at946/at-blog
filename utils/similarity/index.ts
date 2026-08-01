// import { generateEmbedding } from './generateEmbedding';

import fs from 'node:fs/promises';
import path from 'node:path';
import generateEmbedding from './generateEmbedding';
import prepareArticles from './prepareArticles';
import type { EmbeddedArticle, PreparedArticle } from './type';

const OUTPUT_PATH = path.resolve('utils/similarity/embeddings.json');

const main = async () => {
	const _preparedArticles: PreparedArticle[] = await prepareArticles();
	const preparedArticles: PreparedArticle[] = [_preparedArticles[0]];
	const embeddedArticles: EmbeddedArticle[] = [];

	for (const article of preparedArticles) {
		const embeddedArticle = await generateEmbedding(article);
		embeddedArticles.push(embeddedArticle);
	}

	await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
	await fs.writeFile(
		OUTPUT_PATH,
		JSON.stringify(embeddedArticles, null, 2),
		'utf-8',
	);
};

main();
