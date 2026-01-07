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
const regex = /\!*\[([^\]]+)\]\(([^)]+)\)/g;
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
        var links = [];
        var link;
        let content = this.page.rawInput;
        let match;
        while ((match = regex.exec(content)) !== null) {
            link = {
                title: match[1],
                url: match[2]
            };
            links.push(link);
        }
        if (links.length > 0) {
            console.dir(links);
        }
        return "<< Post Links Section >>";
    });
}
