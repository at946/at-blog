import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import normalizeMarkdoc from '@/utils/normalizeMarkdoc';
import type { Article } from './type';

const BLOG_PATH: string = 'src/content/blog';

export const prepareArticles = async (): Promise<Article[]> => {
	const files = await fg(`${BLOG_PATH}/**/[^_]*.mdoc`);

	return Promise.all(
		files.map(async (file) => {
			const raw = await fs.readFile(file, 'utf-8');

			const { data, content } = matter(raw);

			return {
				slug: path.basename(path.dirname(file)),
				title: data.title,
				content: normalizeMarkdoc(content),
			};
		}),
	);
};
