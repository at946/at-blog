import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		tags: z.array(z.string()).optional(),
		date: z.string(),
		published: z.boolean(),
	}),
});

export const collections = {
	blog: blogCollection,
};
