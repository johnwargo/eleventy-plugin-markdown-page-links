# Eleventy Plugin Markdown Post Links

An [Eleventy](https://www.11ty.dev/) plugin that adds a shortcode to Eleventy sites that generates a list of links from a markdown page's content. The plugin supports a variety of configuration options (configurable as global settings and/or individual settings per shortcode use). 

**Notes:** 

+ Due to some technical limitations in Eleventy, shortcodes don't have access to rendered HTML content for a page. To implement this successfully, the plugin looks for links in pre-rendered content.  Since I primarily use markdown files for site content, I built the plugin to look for markdown anchor links.
+ I only tested this plugin using Liquid template code in Markdown files. This approach also makes it easy for the plugin to ignore site navigation on posts, etc.

## Installation

To install the plugin, in a terminal window pointing to an Eleventy project, execute the following command:

```shell
npm install eleventy-plugin-markdown-page-links
```

In your project's eleventy.config.js file, import the package (at the top of the file) using:

``` ts
import pageLinks from 'eleventy-plugin-markdown-page-links';
```

And in the same file's module.exports section, along with all the other plugin statements you site uses, add the following `addPlugin` method call:

``` ts
module.exports = eleventyConfig => {

  // add only the following line
  eleventyConfig.addPlugin(pageLinks);

}
```

The complete file should look something like the following (but with your site's other stuff in it as well):

``` ts
import pageLinks from 'eleventy-plugin-markdown-page-links';

module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(pageLinks);
  
};
```

With that in place, your site now has a shortcode called `pageLinks` the site can use to generate a list of links from the current page.

## Background

Posts in my [personal blog](https://johnwargo.com) often reference a lot of external links, and some of the longer posts have 10 or more links. I realized I could make it easier for readers if I listed all links in a group somewhere on the page. This isn't a critical feature for the site, but something I thought visitors might find useful.

Add the shortcode to a page's template to have the links appear on every page, or place the shortcode at the top or bottom of a long article to generate links for just that page. The plugin also supports a configuration option, `minimumLinks`, that instructs the shortcode to generate links only if there are a specific number of links on the page.

The plugin supports the following options:

**List Types:**

+ **Simple list** - Generates a simple list of page links with each as a separate paragraph in the page.
+ **Ordered list** - Generates a list of page links as an ordered list using the `<ol>` and `</ol>` tags
+ **Unordered list** - Generates a list of page links as an ordered list using the `<ul>` and `</ul>` tags

**List Options:**

+ **Collapsible list** - Link list and renders it in a collapsed section on the page using the `<details>` and `<summary>` tags.
+ **New Tab** - Links open in a new tab using `target="_blank"`.
+ **Styled List** - Allows you to apply a CSS class to the list container on the page.
+ **Minimum Links** - Only generate the link list when there's at least a specified number of links on the page.

This repo includes a [sample app](https://mdpagelinks.netlify.app/) (hosted for free on [Netlify](https://www.netlify.com/)) that demonstrates all of these options; check it out to learn more.

## Operation

Add the shortcode `pageLinks` to a page or page template to generate a list of the page's links in that location. In this example, no list type is specified, so the plugin uses the default option of the simple list.

``` markdown
Links on this page:

{% pageLinks %}

Bacon ipsum dolor amet picanha filet mignon beef ribs swine tongue kielbasa...
```

This generates the following content on the page:

![Sample links list](/images/image-01.png)

Specify a different list type (such as unordered list: 2) by specifying the list type as a parameter to the shortcode:

``` markdown
Links on this page:

{% pageLinks 2 %}

Bacon ipsum dolor amet picanha filet mignon beef ribs swine tongue kielbasa...
```

This generates the unordered list shown below:

![Sample links list](/images/image-02.png)

### Configuration Options

The shortcode supports the following options:

| Name            | Option              | Description | 
| --------------- |-------------------- | ----------- |
| Collapsible     | `collapsible`       | Generates a collapsible section containing the list of links. When you enable this option, you must also specify a value for `sectionTitle`. [Example](https://mdpagelinks.netlify.app/posts/collapsible/). Default: `false` |
| External Links  | `externalLinksOnly` | Omits local links from the generated output. [Example](https://mdpagelinks.netlify.app/posts/external-only/). Default: `false` |
| List Class      | `listClass`         | Defines the name of the CSS Class you want added to the list container. [Example](https://mdpagelinks.netlify.app/posts/styled/). Default: "" |
| List Type       | `listType`          | Specifies the type of list generated; supported options are `0` {Simple), `1` (Ordered), `2` (Unordered). Examples: [Simple](https://mdpagelinks.netlify.app/posts/simple/), [Ordered](https://mdpagelinks.netlify.app/posts/ordered/), [Unordered](https://mdpagelinks.netlify.app/posts/unordered/). Default: 0  |
| Minimum Links   | `minimumLinks`      | Specifies the minimum number of links on the page required before the shortcode generates the link list. If your site generally doesn't have a lot of links per page, you can use this it to only generates links for articles with a greater number of links. [Example](https://mdpagelinks.netlify.app/posts/minimum/). Default: 0 |
| Open in New Tab | `openInNewTab`      | By default, the shortcut generates links that open in a new browser window/tab. With this option set to `false`, when a user clicks one of the links, the linked content will replace the current page in the browser. [Example](https://mdpagelinks.netlify.app/posts/same-window/). Default: `true` |
| Section Title   | `sectionTitle`      | With `collapsible` enabled, this configuration option defines the text the plugin generates as the Summary (`<summary></summary>`) of the collapsible section. If you don't provide a value for this configuration option, the shortcut uses the default value. [Example](https://mdpagelinks.netlify.app/posts/collapsible/). Default: "Links" |

You can set any of these settings as global options for the shortcut when you load the plugin in your project's `eleventy.config.js` file. Simply add any supported configuration variable in an object to the `addPlugin` method invocation. This following example configures the plugin to open all links in the same browser tab/window (disabling the default behavior).

``` ts
eleventyConfig.addPlugin(pageLinks, { openInNewTab: false });
```

Specify any of the configuration options as parameters to the shortcode; as positional parameters, the order is the following:

1. `listType?` ListType
2. `minimumLinks`: number
3. `openInNewTab`: boolean
4. `externalLinksOnly`: boolean
5. `listClass`: string
6. `collapsible`: boolean
7. `sectionTitle`: string

The `ListType` enum looks like this:

``` ts
enum ListType {
  Simple,      // 0
  Ordered,     // 1
  Unordered,   // 2
}
```

**Note:** Some time after launch, but perhaps before launch, I'll configure the shortCode code to use named parameters.

Refer to the [sample app](https://mdpagelinks.netlify.app/) for examples for each of these options.