import { defineCollection, z } from 'astro:content';
import TAGS from '@/content/zod/tags';
import { glob } from 'astro/loaders';

const allCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content' }),
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		tags: z.enum(TAGS).array().optional(),
		publicationDate: z.date(),
		externalUrl: z.string().url().optional(),
	}),
});

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content/blog' }),
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		tags: z.enum(TAGS).array().optional(),
		publicationDate: z.date(),
		externalUrl: z.string().url().optional(),
	}),
});

const slidesCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content/slides' }),
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		tags: z.enum(TAGS).array().optional(),
		publicationDate: z.date(),
		externalUrl: z.string().url().optional(),
	}),
});

const videosCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content/videos' }),
	schema: z.object({
		title: z
			.string()
			.max(100, 'The title length must be less than or equal to 100 chars'),
		tags: z.enum(TAGS).array().optional(),
		publicationDate: z.date(),
		externalUrl: z.string().url().optional(),
	}),
});

export const collections = {
	all: allCollection,
	blog: blogCollection,
	slides: slidesCollection,
	videos: videosCollection,
};
