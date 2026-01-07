import markdownLinkExtractor from 'markdown-link-extractor';
const defaultConfig = {
    'collapsible': false,
    'contentScope': 'PostLinksScope',
    'externalLinksOnly': false,
    'minimumLinks': 0,
    'openInNewTab': true,
    'orderedList': false,
    'sectionTitle': 'Links',
    'debugMode': true
};
const APP_NAME = 'Eleventy-Plugin-Post-Links';
export default function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("postLinks", function () {
        options = { ...defaultConfig, ...options };
        if (options.debugMode) {
            console.log('Options');
            console.table(options);
        }
        if (options.collapsible && !options.sectionTitle) {
            return `[${APP_NAME}] When using 'collapsible' option, you must also provide a 'sectionTitle' option.`;
        }
        console.dir(this.page);
        const links = markdownLinkExtractor(this.page.rawInput);
        console.dir(links);
        return "<< Post Links Section >>";
    });
}
