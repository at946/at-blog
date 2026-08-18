import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import normalizeMarkdoc from '@/utils/normalizeMarkdoc';

export type SearchedArticle = {
	slug: string;
	title: string;
	content: string;
	tags: string[];
	externalUrl?: string;
};

const OUTOUT_FILEPATH: string = 'public/search-index.json';

async function createSearchIndex() {
	const filePaths: string[] = (
		await fg(`src/content/blog/**/[^_]*.mdoc`)
	).sort();

	const articles: SearchedArticle[] = (
		await Promise.all(
			filePaths.map(async (filePath) => {
				const file = await fs.readFile(filePath, 'utf-8');
				const { data, content } = matter(file);
				const title: string = data.title;
				const tags: string[] = data.tags;
				const normalizedContent: string = normalizeMarkdoc(content).trim();

				if (!normalizedContent) {
					return [];
				}

				return [
					{
						slug: path.basename(path.dirname(filePath)),
						title: title,
						tags: tags,
						content: normalizedContent,
						externalUrl: data.externalUrl,
					},
				];
			}),
		)
	).flat();

	await fs.writeFile(
		OUTOUT_FILEPATH,
		JSON.stringify(articles, null, 2),
		'utf-8',
	);
}

createSearchIndex();
