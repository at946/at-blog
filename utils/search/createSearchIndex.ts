import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import normalizeMarkdoc from '@/utils/normalizeMarkdoc';

type Article = {
	slug: string;
	title: string;
	content: string;
};

const OUTOUT_FILEPATH: string = 'public/search-index.json';

async function createSearchIndex() {
	const filePaths: string[] = (
		await fg(`src/content/blog/**/[^_]*.mdoc`)
	).sort();

	const articles: Article[] = (
		await Promise.all(
			filePaths.map(async (filePath) => {
				const file = await fs.readFile(filePath, 'utf-8');
				const { data, content } = matter(file);
				const title: string = data.title;
				const normalizedContent: string = normalizeMarkdoc(content).trim();

				if (!normalizedContent) {
					return [];
				}

				return [
					{
						slug: path.basename(path.dirname(filePath)),
						title: title,
						content: normalizedContent,
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
