// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	renderers: [
		'@astrojs/renderer-svelte',
		"@astrojs/renderer-vue",
		"@astrojs/renderer-react",
		"@astrojs/renderer-preact"
	],
	// projectRoot: "./",
	// public: "public",
	// dist: "dist",
	buildOptions: {
		sitemap: true,
		site: "https://example.com",
		pageUrlFormat: "file"
	}
});
