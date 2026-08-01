import path from 'node:path';

export const EMBEDDINGS_JSON_FILE_PATH = path.resolve(
	'utils/similarity/embeddings.json',
);

export const SIMILARITY_JSON_FILE_PATH = path.resolve(
	'src/data/similarity-list.json',
);

export const SIMILAR_ARTICLE_COUNT: number = 10;
