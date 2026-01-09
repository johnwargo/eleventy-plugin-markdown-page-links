# Eleventy Plugin Markdown Post Links

## Tasks

- [ ] Omit duplicate links in output
- [ ] Implement external-only flag
- [ ] Update readme
- [ ] Write blog post
- [ ] Share on social media
- [ ] 

---

An [Eleventy](https://www.11ty.dev/) plugin that adds a shortcode to Eleventy sites that generates a list of links from a markdown page's content. The plugin supports a variety of configuration options (configurable as global settings and/or individual settings per shortcode use). 

**Notes:** 

+ Due to some technical limitations in Eleventy, shortcodes don't have access to rendered HTML content for a page. To implement this successfully, the plugin looks for links in pre-rendered content.  Since I primarily use markdown files for site content, I built the plugin to look for markdown anchor links.
+ I only tested this plugin using Liquid template code in Markdown files. 

## Installation

To install the plugin, in a terminal window pointing to an Eleventy project, execute the following command:

```shell
npm install eleventy-plugin-markdown-page-links
```

In your project's eleventy.config.js file, import the package (at the top of the file) using:

``` ts
const pageLinks = require('eleventy-plugin-post-stats');
```

And in the same file's module.exports section, along with all the other plugin statements you site uses, add the following addPlugin statement:

``` ts
module.exports = eleventyConfig => {

  // add only the following line
  eleventyConfig.addPlugin(pageLinks);

}
```

The complete file should look something like the following (but with your site's other stuff in it as well):

``` ts
const pageLinksPlugin = require('./eleventy-plugin-markdown-page-links.js');

module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(pageLinks);
  
};
```

With that in place, your site now has a shortcode called `pageLinks` the site can use to generate a list of links from the current page.

Here's an example from the [sample app](https://mdpagelinks.netlify.app/) included with the plugin's source code:

![Sample links list](/images/image-01.png)


```ts
eleventyConfig.addPlugin(pageLinks, { openInNewTab: true });
```


## Background

Posts in my [personal blog](https://johnwargo.com) often reference a lot of external links, and some of the longer posts have 10 or more links. I realized I could make it easier for readers if I listed all links in a group somewhere on the page. This isn't a critical feature for the site, but something I thought visitors might find useful.

Add the shortcode to a page's template to have the links appear on every page, or place the shortcode at the top or bottom of a long article to generate links for just that page. The plugin supports a configuration option, `minimumLinks`, that instructs the shortcode to generate links only if there are a specific number of links on the page.



Options:

+ Simple list
+ Collapsible list
+ Unordered (ul) or unordered (ol) List-o-links (`orderedList`)
+ Open in new tab (`_blank`)


https://mdpagelinks.netlify.app/


## Operation

### Configuration Options

| Option              | Description | 
| ------------------- | ----------- |
| `collapsible`       | Default: `false` |
| `externalLinksOnly` | Default: `false` |
| `listClass`         | Default: '' |
| `listType`          | Default: 0     Supported options are `0` {Simple), `1` (Ordered), `2` (Unordered) |
| `minimumLinks`      | Default: 0 |
| `openInNewTab`      | Default: `true` |
| `sectionTitle`      | Default: 'Links' |
