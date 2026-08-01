import fs from 'node:fs/promises';
import { EMBEDDINGS_FILE_PATH } from './config';
import type { Embedding } from './type';

const loadEmbeddings = async (): Promise<Embedding[]> => {
	try {
		const json = await fs.readFile(EMBEDDINGS_FILE_PATH, 'utf-8');
		return JSON.parse(json);
	} catch {
		return [];
	}
};

export default loadEmbeddings;
