import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";

export type LocalizedCollection = "blog" | "daily" | "work";

export type LocalizedEntry<C extends LocalizedCollection> = CollectionEntry<C>;

export function getEntrySlug(entry: { id: string }): string {
  return entry.id.split("/").slice(1).join("/");
}

export async function getLocalizedEntries<C extends LocalizedCollection>(
  collection: C,
  lang: Lang,
): Promise<LocalizedEntry<C>[]> {
  const entries = await getCollection(collection, ({ id }: { id: string }) =>
    id.startsWith(`${lang}/`),
  );
  return entries.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  );
}
