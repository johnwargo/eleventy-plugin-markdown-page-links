# Eleventy Plugin Markdown Post Links

## Tasks

- [ ] Omit duplicate links in output
- [ ] Implement external-only flag
- [ ] Update readme
- [ ] Write blog post
- [ ] Share on social media
- [ ] 

---

An [Eleventy](https://www.11ty.dev/) plugin that adds a shortcode to eleventy site that generates a list of links from a markdown page's content. 

**Note:** Due to some technical limitations in Eleventy, shortcodes don't have access to rendered HTML content for the page. So, to implement this successfully, I had to look for links in pre-rendered content.  Since I primarily use markdown files for site content, I built the plugin to look for markdown anchor links.


## Background



Options:

+ Simple list
+ Collapsible list
+ Unordered (ul) or unordered (ol) List-o-links (`orderedList`)
+ Open in new tab (`_blank`)


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
