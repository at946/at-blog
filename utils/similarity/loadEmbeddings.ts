import fs from 'node:fs/promises';
import { EMBEDDINGS_JSON_FILE_PATH } from './config';
import type { ArticleEmbedding } from './type';

const loadEmbeddings = async (): Promise<ArticleEmbedding[]> => {
	try {
		const json = await fs.readFile(EMBEDDINGS_JSON_FILE_PATH, 'utf-8');
		return JSON.parse(json);
	} catch {
		return [];
	}
};

export default loadEmbeddings;
