import fs from 'node:fs/promises';
import type { ArticleEmbedding } from './similarity/type';

(async function main() {
	const embedding: ArticleEmbedding[] = JSON.parse(
		await fs.readFile('utils/similarity/embeddings.json', 'utf-8'),
	);

	const upperCaseSlugs = embedding
		.filter((article) => /[A-Z]/.test(article.slug))
		.map((article) => article.slug);

	console.log(upperCaseSlugs);
})();
