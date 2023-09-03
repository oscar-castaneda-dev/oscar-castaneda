import { defineCollection, z } from "astro:content";

import { formatDate } from "@utils/date";

const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      categories: z.array(z.string()),
      date: z.string().transform(str => formatDate(str)),
      excerpt: z.string(),
      image: image(),
      title: z.string(),
    }),
});

export const collections = {
  posts: postsCollection,
};
