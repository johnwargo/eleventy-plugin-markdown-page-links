import postLinksPlugin from './eleventy-plugin-post-links.js';

export default async function (eleventyConfig) {
	
	eleventyConfig.addPlugin(postLinksPlugin);

	eleventyConfig.addPassthroughCopy("src/assets/");

	return {
		dir: {
			input: 'src',
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data"
		}
	}

};

