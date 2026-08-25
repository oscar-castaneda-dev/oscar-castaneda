// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://oscarcastaneda.dev",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
});
