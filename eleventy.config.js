const postLinks = require('./eleventy-plugin-post-links.js');

module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(postLinks);

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