import { defineCollection, z } from 'astro:content';
import TAGS from '@/content/zod/tags';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content/blog' }),
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		type: z.enum(['blog', 'slide', 'video']),
		tags: z.enum(TAGS).array().optional(),
		publicationDate: z.date(),
		externalUrl: z.string().url().optional(),
		youtubeEmbeddedUrl: z.string().url().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};
