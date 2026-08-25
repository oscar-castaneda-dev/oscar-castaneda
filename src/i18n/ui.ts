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
		'nav.home': 'Home',
		'nav.blog': 'Blog',
		'nav.daily': 'Daily',
		'nav.about': 'About',
		'nav.switchLanguage': 'Change language',
		'home.heading': '🧑‍🚀 Hello, Astronaut!',
		'about.title': 'About Me',
		'about.description': 'Lorem ipsum dolor sit amet',
		'daily.title': 'Daily',
		'daily.description': 'Short notes, posted as they happen.',
		'daily.empty': 'No notes yet.',
		'daily.permalink': 'Permalink',
		'blog.updatedOn': 'Last updated on',
		'footer.rights': 'All rights reserved.',
		'footer.author': 'Your name here',
		'social.mastodon': 'Follow Astro on Mastodon',
		'social.twitter': 'Follow Astro on Twitter',
		'social.github': "Go to Astro's GitHub repo",
	},
	es: {
		'site.title': 'Blog de Astro',
		'site.description': '¡Bienvenido a mi sitio web!',
		'nav.home': 'Inicio',
		'nav.blog': 'Blog',
		'nav.daily': 'Daily',
		'nav.about': 'Acerca de',
		'nav.switchLanguage': 'Cambiar de idioma',
		'home.heading': '🧑‍🚀 ¡Hola, astronauta!',
		'about.title': 'Acerca de mí',
		'about.description': 'Lorem ipsum dolor sit amet',
		'daily.title': 'Daily',
		'daily.description': 'Notas breves, publicadas sobre la marcha.',
		'daily.empty': 'Todavía no hay notas.',
		'daily.permalink': 'Enlace permanente',
		'blog.updatedOn': 'Actualizado el',
		'footer.rights': 'Todos los derechos reservados.',
		'footer.author': 'Tu nombre aquí',
		'social.mastodon': 'Sigue a Astro en Mastodon',
		'social.twitter': 'Sigue a Astro en Twitter',
		'social.github': 'Ir al repositorio de Astro en GitHub',
	},
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
