export const languages = {
	en: 'English',
	es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
	en: {
		'site.title': 'Astro Blog',
		'site.description': 'Welcome to my website!',
		'about.title': 'About Me',
		'about.description': 'A bit about who I am and what I work on.',
		'daily.title': 'Daily',
		'daily.description': 'Short notes, posted as they happen.',
		'daily.empty': 'No notes yet.',
		'daily.permalink': 'Permalink',
		'blog.updatedOn': 'Last updated on',
	},
	es: {
		'site.title': 'Blog de Astro',
		'site.description': '¡Bienvenido a mi sitio web!',
		'about.title': 'Acerca de mí',
		'about.description': 'Un poco sobre quién soy y en qué trabajo.',
		'daily.title': 'Daily',
		'daily.description': 'Notas breves, publicadas sobre la marcha.',
		'daily.empty': 'Todavía no hay notas.',
		'daily.permalink': 'Enlace permanente',
		'blog.updatedOn': 'Actualizado el',
	},
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
