---
layout: base
title: Eleventy Plugin Post Links Example
---

This [11ty](https://www.11ty.dev/) (Eleventy) plugin adds a **Links** section to a page (post, page, whatever) listing the all the links on the current page. This is useful if you put a lot of links in your site's articles and want to provide an easy way for readers to see all the links in one place.

To use this plugin, within the page content, add the following shortcode where you want the links to appear:

<code>
&#123;% postLinks %&#125;
</code>

With that in place, the plugin will automatically generate a list of links that looks like the following:

![Links Section example](/assets/images/image-01.png)

Use the example links above to see the different ways to invoke the shortcode.
