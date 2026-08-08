import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import normalizeMarkdoc from '@/utils/normalizeMarkdoc';

const OUTOUT_FILEPATH: string = 'src/data/search-index.json';

async function createSearchIndex() {
	const filePaths: string[] = await fg(`src/content/blog/**/[^_]*.mdoc`);

	const articles = await Promise.all(
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
	);

	await fs.writeFile(
		OUTOUT_FILEPATH,
		JSON.stringify(articles.flat(), null, 2),
		'utf-8',
	);
}

createSearchIndex();
