import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
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
	loader: glob({ base: './src/content/daily', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			// A note is allowed to be untitled — the date is its heading then.
			title: z.string().optional(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			tags: z.array(z.string()).default([]),
		}),
});

export const collections = { blog, daily };
