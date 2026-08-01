// import { generateEmbedding } from './generateEmbedding';

import fs from 'node:fs/promises';
import path from 'node:path';
import { EMBEDDINGS_FILE_PATH } from './config';
import filterChangedArticles from './filterChangedArticles';
import generateEmbedding from './generateEmbedding';
import loadEmbeddings from './loadEmbeddings';
import prepareArticles from './prepareArticles';
import type { EmbeddedArticle, PreparedArticle } from './type';

const main = async () => {
	const _preparedArticles: PreparedArticle[] = await prepareArticles();
	const preparedArticles: PreparedArticle[] = [_preparedArticles[0]];
	const embeddedArticles: EmbeddedArticle[] = await loadEmbeddings();
	const articlesToUpdate: PreparedArticle[] = filterChangedArticles(
		preparedArticles,
		embeddedArticles,
	);

	for (const article of articlesToUpdate) {
		const embeddedArticle = await generateEmbedding(article);
		embeddedArticles.push(embeddedArticle);
	}

	await fs.mkdir(path.dirname(EMBEDDINGS_FILE_PATH), { recursive: true });
	await fs.writeFile(
		EMBEDDINGS_FILE_PATH,
		JSON.stringify(embeddedArticles, null, 2),
		'utf-8',
	);
};

main();
