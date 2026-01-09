---
layout: base
title: Eleventy Plugin Page Links Example
---

This [11ty](https://www.11ty.dev/) (Eleventy) plugin adds a **Links** section to a page (post, page, whatever) listing the all the links on the current page. This is useful if you put a lot of links in your site's articles and want to provide an easy way for readers to see all the links in one place.

To use this plugin, within the page content, add the following shortcode where you want the links to appear:

<code>
&#123;% pageLinks %&#125;
</code>

With that in place, the plugin automatically generates a list of links at that location on the page. You can set global configuration options that apply to the generated links on every page. You can also override the default settings through parameters passed to the shortcode.

Use the menu at the top of the page or the links below to see examples of the different options for the plugin:

| Example                            | Description |
| ---------------------------------- | ----------- |
| [Simple](/posts/simple/)           | A simple text-based (`<p>` `</p>`) list of links. |
| [Ordered](/posts/ordered/)         | Displays an ordered list (`<ul>` `</ul>`) of links. |
| [Unordered](/posts/unordered/)     | Displays an unordered list (`<ol>` `</ol>`) of links. |
| [Collapsible](/posts/collapsible/) | Displays the links in a collapsible section using the `<details>` and `<summary>` tags. |
| [Minimal](/posts/minimum)          | Don't display links unless there are a minimum number of links on the page. |
| [Same Window](/posts/same-window/) | Links open in the same window (the plugin's configured to open in a new window by default). |
| [Styled](/posts/styled/)| Adds a custom CSS class to the generated output. |
