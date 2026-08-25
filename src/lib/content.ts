import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

/** Collections whose entries are grouped into per-language folders. */
export type LocalizedCollection = 'blog' | 'daily';

export type LocalizedEntry<C extends LocalizedCollection> = CollectionEntry<C>;

/**
 * Entries live in `src/content/<collection>/<lang>/`, so the collection id is
 * `<lang>/<slug>`. Routes only care about the slug part.
 */
export function getEntrySlug(entry: { id: string }): string {
	return entry.id.split('/').slice(1).join('/');
}

/** Every entry of `collection` written in `lang`, newest first. */
export async function getLocalizedEntries<C extends LocalizedCollection>(
	collection: C,
	lang: Lang,
): Promise<LocalizedEntry<C>[]> {
	const entries = await getCollection(collection, ({ id }: { id: string }) =>
		id.startsWith(`${lang}/`),
	);
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
