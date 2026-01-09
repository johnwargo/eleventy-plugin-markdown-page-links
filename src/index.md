---
layout: base
title: Home
---

This [11ty](https://www.11ty.dev/) (Eleventy) plugin adds a **Links** section to a page (post, page, whatever) listing the all the links on the current page. This is useful if you put a lot of links in your site's articles and want to provide an easy way for readers to see all the links in one place.

To use this plugin, within the page content, add the following shortcode where you want the links to appear:

<code>
&#123;% pageLinks %&#125;
</code>

With that in place, the plugin automatically generates a list of links at that location on the page. You can set global configuration options that apply to the generated links on every page. You can also override the default settings through parameters passed to the shortcode.

The plugin supports the following options:

**List Types:**

+ [Simple list](/posts/simple/) - (default) Generates a simple list of page links with each link in a separate paragraph.
+ [Ordered list](/posts/ordered/) - Generates a list of page links as an ordered list using the `<ol>` and `</ol>` tags
+ [Unordered list](/posts/unordered/) - Generates a list of page links as an ordered list using the `<ul>` and `</ul>` tags

**List Options:**

+ New Tab - (default) Links open in a new tab (using `target="_blank"  rel="noopener noreferrer"` in the generated anchor tag).
+ [Same Tab](/posts/same-window/) - Links open in a the same browser window.
+ [Collapsible list](/posts/collapsible/) - Link list and renders it in a collapsed section on the page using the `<details>` and `<summary>` tags.
+ [Styled List](/posts/styled/) - Allows you to apply a CSS class to the list container on the page.
+ [Minimum Links](/posts/minimum/) - Only generate the link list when there's at least a specified number of links on the page.

Use the menu at the top of the page see examples of each of the available options in action.