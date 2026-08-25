import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import generateHash from '../common/generateHash';
import generateOgp from './generate-ogp';

const BLOG_DIR: string = 'src/content/blog';

const files = await fg(`${BLOG_DIR}/**/*.mdoc`);

for (const file of files) {
	const raw = await readFile(file, 'utf-8');
	const parsed = matter(raw);

	const title: string = parsed.data.title;
	const tags: string[] = parsed.data.tags;
	const ogpHash: string = generateHash(`${title}\n${tags.join(',')}`);

	if (parsed.data.ogpHash === ogpHash) continue;

	console.log(title);

	const slug: string = path.basename(path.dirname(file));

	await generateOgp({ slug, title, tags });

	parsed.data.ogpHash = ogpHash;

	await writeFile(file, matter.stringify(parsed.content, parsed.data), 'utf-8');
}
