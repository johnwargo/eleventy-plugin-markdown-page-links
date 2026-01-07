import postLinksPlugin from './eleventy-plugin-post-links.js';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

export default async function (eleventyConfig) {

		// this plugin
	eleventyConfig.addPlugin(postLinksPlugin);

	// 11ty plugins
	eleventyConfig.addPlugin(syntaxHighlight);
	
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

