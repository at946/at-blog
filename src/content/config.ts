import { defineCollection, z } from 'astro:content';
import TAGS from '@/content/zod/tags';

const blogCollection = defineCollection({
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		tags: z.enum(TAGS).array().optional(),
		publicationDate: z.date(),
		isPublished: z.boolean(),
	}),
});

export const collections = {
	blog: blogCollection,
};
