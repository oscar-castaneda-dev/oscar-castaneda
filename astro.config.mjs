// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://oscarcastaneda.dev",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  // Downloaded and self-hosted at build time — no request to Google at runtime.
  // `latin-ext` carries the accents and ñ the Spanish content needs.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Space Grotesk",
      cssVariable: "--font-space-grotesk",
      styles: ["normal"],
      weights: ["300 700"], // variable
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Space Mono",
      cssVariable: "--font-space-mono",
      styles: ["normal"],
      weights: [400, 700], // static family — only these two exist
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-monospace", "monospace"],
    },
    {
      provider: fontProviders.google(),
      name: "Doto",
      cssVariable: "--font-doto",
      styles: ["normal"],
      weights: ["100 900"], // variable, plus a ROND 0–100 axis for dot roundness
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
});