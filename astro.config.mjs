import { defineConfig } from 'astro/config'

import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
// import react from '@astrojs/react';
// import preact from '@astrojs/preact';

export default defineConfig({
	// root: ".",
	// srcDir: "/src",
	// publicDir: "./public"
	// outDir: "./dist",
	site: "https://example.com",
	// base: ""
	build: {
		format: "file"
	},
	server: {
		port: 3000,
		host: true,
	},
	integrations: [
		svelte(),
		vue()
	]

	// your configuration options here...
	// https://docs.astro.build/en/reference/configuration-reference/
})

// // @ts-check
// export default /** @type {import('astro').AstroUserConfig} */ ({
// 	integrations: [
// 		svelte(),
// 		vue(),
// 		// react(),
// 		// preact(),
// 	],
// 	// projectRoot: "./",
// 	// public: "public",
// 	// dist: "dist",
// 	buildOptions: {
// 		sitemap: true,
// 		site: "https://example.com",
// 		// pageUrlFormat: "file"
// 	}
// });
