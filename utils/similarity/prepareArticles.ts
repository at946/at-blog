import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import normalizeMarkdoc from '@/utils/normalizeMarkdoc';
import type { PreparedArticle } from './type';

const generateHash = (value: string): string => {
	return createHash('sha256').update(value).digest('hex');
};

const prepareArticles = async (): Promise<PreparedArticle[]> => {
	const filePaths: string[] = await fg(`src/content/blog/**/[^_]*.mdoc`);

	return Promise.all(
		filePaths.map(async (filePath) => {
			const file = await fs.readFile(filePath, 'utf-8');
			const { data, content } = matter(file);
			const title: string = data.title;
			const normalizedContent: string = normalizeMarkdoc(content);

			return {
				slug: path.basename(path.dirname(filePath)),
				title: title,
				content: normalizedContent,
				articleHash: generateHash(`${title}\n${content}`),
			};
		}),
	);
};

export default prepareArticles;
