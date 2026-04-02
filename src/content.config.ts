import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blogs" }),
	schema: z.object({
		title: z.string(),
		url: z.string().url(),
		description: z.string(),
		category: z.string(),
		thumbnail: z.string().optional(),
		tags: z.array(z.string()).default([]),
		publishDate: z.date().optional(),
	}),
});

const notes = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/notes" }),
	schema: z.object({
		title: z.string(),
		publishDate: z.date(),
		category: z.enum(['Diary', 'Tech', 'Local', 'Knowledge', 'Jurnal']),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blogs, notes };
