// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://4thavenue.info/",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        // ノート個別記事のURL（/notes/YYYY/MM/wNN/...）から日付を抽出して lastmod に設定
        if (item.url.includes("/notes/") && !item.url.includes("/tag/")) {
          const dateMatch = item.url.match(/(\d{4}-\d{2}-\d{2})/);
          if (dateMatch) {
            item.lastmod = dateMatch[1];
          }
        }
        return item;
      },
    }),
  ],
});
