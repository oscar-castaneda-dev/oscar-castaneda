import rss from '@astrojs/rss';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { languages } from '@/i18n/ui';
import { getLangFromUrl, useTranslations } from '@/i18n/utils';
import { getEntrySlug, getLocalizedEntries } from '@/lib/content';

export function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
	const lang = getLangFromUrl(context.url);
	const t = useTranslations(lang);
	const posts = await getLocalizedEntries('blog', lang);
	return rss({
		title: t('site.title'),
		description: t('site.description'),
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getRelativeLocaleUrl(lang, `blog/${getEntrySlug(post)}`),
		})),
		customData: `<language>${lang}</language>`,
	});
}
