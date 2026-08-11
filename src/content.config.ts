import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content/blog' }),
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		type: z.enum(['blog', 'slide', 'video']),
		publicationDate: z.date(),
		tags: z.array(z.string()).optional(),
		externalUrl: z.url().optional(),
		youtubeEmbeddedUrl: z.url().optional(),
		docswellId: z.string().optional(),
		speakerDeckId: z.string().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};
