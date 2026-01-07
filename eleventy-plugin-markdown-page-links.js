const defaultConfig = {
    'collapsible': false,
    'externalLinksOnly': false,
    'minimumLinks': 0,
    'openInNewTab': true,
    'orderedList': false,
    'sectionTitle': 'Links',
    'debugMode': true
};
const regex = /\!*\[([^\]]+)\]\(([^)]+)\)/g;
export default function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("postLinks", function () {
        var content;
        var link;
        var links = [];
        var match;
        var resultStr = '';
        options = { ...defaultConfig, ...options };
        if (options.debugMode) {
            console.log('Options');
            console.table(options);
        }
        content = this.page.rawInput;
        while ((match = regex.exec(content)) !== null) {
            link = {
                title: match[1],
                url: match[2]
            };
            links.push(link);
        }
        if (options.debugMode && links.length > 0) {
            console.dir(links);
        }
        if (links.length < options.minimumLinks) {
        }
        return resultStr;
    });
}
