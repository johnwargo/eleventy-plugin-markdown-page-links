/***********************************************
 * Demonstration site for the 
 * Eleventy Plugin Markdown Page Links plugin
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

import postLinksPlugin from './eleventy-plugin-markdown-page-links.js';

export default async function (eleventyConfig) {

	// this plugin
	eleventyConfig.addPlugin(postLinksPlugin, { openInNewTab: true });

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

