import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import normalizeMarkdoc from '@/utils/normalizeMarkdoc';
import generateHash from '../common/generateHash';
import generateSummaryAndTags, { type ResponseText } from './generateTags';

const BLOG_DIR = 'src/content/blog';

(async () => {
	const files = await fg(`${BLOG_DIR}/**/*.mdoc`);

	for (const file of files) {
		const raw = await readFile(file, 'utf-8');
		const parsed = matter(raw);

		const title =
			typeof parsed.data.title === 'string'
				? parsed.data.title
				: path.basename(file);
		const content = normalizeMarkdoc(parsed.content);
		const contentHash: string = generateHash(`${title}\n${content}`);

		if (contentHash === parsed.data.contentHash) continue;

		console.log(title);

		const { tags }: ResponseText = await generateSummaryAndTags(title, content);

		console.log(tags);

		parsed.data.tags = tags;
		parsed.data.contentHash = contentHash;

		await writeFile(
			file,
			matter.stringify(parsed.content, parsed.data),
			'utf-8',
		);
	}
})();
