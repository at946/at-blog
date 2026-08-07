import fs from 'node:fs/promises';
import { UMAP } from 'umap-js';
import { EMBEDDINGS_JSON_FILE_PATH } from '../similarity/config';
import type { ArticleEmbedding } from '../similarity/type';
import type { ArticleMap } from './types';

const mulberry32 = (seed: number): (() => number) => {
	let state: number = seed;

	return () => {
		state += 0x6d2b79f5;
		let value: number = state;
		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

		return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
	};
};

async function main() {
	const data = JSON.parse(
		await fs.readFile(EMBEDDINGS_JSON_FILE_PATH, 'utf-8'),
	) as ArticleEmbedding[];

	const embeddings = data.map((article) => article.embedding);

	const umap = new UMAP({
		nComponents: 2,
		nNeighbors: 15,
		minDist: 0.1,
		random: mulberry32(42),
	});

	const positions = umap.fit(embeddings);

	const result: ArticleMap[] = data.map((article, index) => ({
		slug: article.slug,
		title: article.title,
		x: positions[index][0],
		y: positions[index][1],
	}));

	await fs.writeFile(
		'src/data/article-map.json',
		JSON.stringify(result, null, 2),
	);
}

main();
