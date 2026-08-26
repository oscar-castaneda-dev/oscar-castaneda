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
			// Written as a plain ISO date; every locale formats it at render time.
			publishedDate: z.coerce.date(),
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
			// The standfirst a listing shows in place of the body.
			excerpt: z.string().optional(),
			publishedDate: z.coerce.date(),
		}),
});

const work = defineCollection({
	// One file per project, grouped by language like the other two.
	loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// The one-word kind of thing this is — `web`, `app`. Shown on the home grid card.
			category: z.string().optional(),
			// Optional: the home grid card falls back to the dot-matrix motif without it.
			cover: z.optional(image()),
			// The same artwork redrawn for the dark theme. Without it `cover` serves both.
			coverDark: z.optional(image()),
			// Sorted by this, newest first — same contract as blog and daily.
			publishedDate: z.coerce.date(),
			role: z.string().optional(),
			stack: z.array(z.string()).default([]),
			url: z.string().url().optional(),
			repo: z.string().url().optional(),
		}),
});

export const collections = { blog, daily, work };
