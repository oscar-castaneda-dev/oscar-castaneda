import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const daily = defineCollection({
	// Short-form notes, one file per entry, grouped by language.
	loader: glob({ base: './src/content/daily', pattern: '**/*.md' }),
	schema: () =>
		z.object({
			// A note is allowed to be untitled — the date is its heading then.
			title: z.string().optional(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			tags: z.array(z.string()).default([]),
		}),
});

const work = defineCollection({
	// One file per project, grouped by language like the other two.
	loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Sorted by this, newest first — same contract as blog and daily.
			pubDate: z.coerce.date(),
			role: z.string().optional(),
			stack: z.array(z.string()).default([]),
			url: z.string().url().optional(),
			repo: z.string().url().optional(),
		}),
});

export const collections = { blog, daily, work };
