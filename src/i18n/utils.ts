import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

/** Narrows an arbitrary string (a route param, a collection id segment) to a Lang. */
function isLang(value: string | undefined): value is Lang {
	return value != null && value in languages;
}

/** Reads the locale out of a URL, falling back to the default language. */
export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	return isLang(lang) ? lang : defaultLang;
}

/** Returns a `t('some.key')` translator bound to `lang`, falling back to the default language. */
export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Locale-aware path builder: `localizedPath('es', 'blog')` -> `/es/blog/`. */
export function localizedPath(lang: Lang, path = ''): string {
	return getRelativeLocaleUrl(lang, path);
}

/** `getStaticPaths` entries for every configured locale. */
export function getLangStaticPaths() {
	return (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));
}

/** The current path with its locale segment stripped, e.g. `/es/blog/first-post/` -> `blog/first-post/`. */
export function pathWithoutLang(url: URL): string {
	return url.pathname.split('/').slice(2).join('/');
}
