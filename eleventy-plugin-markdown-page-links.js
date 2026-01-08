var LinkType;
(function (LinkType) {
    LinkType[LinkType["Simple"] = 0] = "Simple";
    LinkType[LinkType["Ordered"] = 1] = "Ordered";
    LinkType[LinkType["Unordered"] = 2] = "Unordered";
})(LinkType || (LinkType = {}));
const defaultConfig = {
    'debugMode': true,
    'collapsible': false,
    'externalLinksOnly': false,
    'listClass': '',
    'listType': 0,
    'minimumLinks': 0,
    'openInNewTab': true,
    'sectionTitle': 'Links',
};
const PLUGIN_NAME = 'Eleventy-Plugin-Markdown-Page-Links';
const regex = /\!*\[([^\]]+)\]\(([^)]+)\)/g;
function buildLinkList(links, delimiter, newWindow = false) {
    console.log(`Building link list with delimiter: ${delimiter}, newWindow: ${newWindow}`);
    var resultStr = '';
    links.forEach((link) => {
        console.dir(link);
        resultStr += `<${delimiter}><a href="${link.url}"${newWindow ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.title}</a></${delimiter}>\n`;
    });
    return resultStr;
}
export default function (eleventyConfig) {
    eleventyConfig.addFilter('jsonParse', JSON.parse);
    eleventyConfig.addShortcode("postLinks", function (options = {}) {
        var content;
        var link;
        var links = [];
        var match;
        var resultStr;
        if (options.listType < 0 || options.listType > 2) {
            return `${PLUGIN_NAME} Error: Invalid list type specified (${options.listType}).`;
        }
        options = { ...defaultConfig, ...options };
        if (options.debugMode) {
            console.log('Options');
            console.table(options);
        }
        resultStr = '';
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
        if (links.length >= options.minimumLinks) {
            switch (options.listType) {
                case LinkType.Ordered:
                    console.log('Building ordered list');
                    resultStr = `<ol${options.listClass ? ` class="${options.listClass}"` : ''}>\n`;
                    resultStr += buildLinkList(links, 'li', options.openInNewTab);
                    resultStr += '</ol>\n';
                    break;
                case LinkType.Unordered:
                    console.log('Building unordered list');
                    resultStr = `<ul${options.listClass ? ` class="${options.listClass}"` : ''}>\n`;
                    resultStr += buildLinkList(links, 'li', options.openInNewTab);
                    resultStr += '</ul>\n';
                    break;
                default:
                    console.log('Building div link list');
                    resultStr = `<div${options.listClass ? ` class="${options.listClass}"` : ''}>\n`;
                    resultStr += buildLinkList(links, 'p', options.openInNewTab);
                    resultStr += '</div>\n';
                    break;
            }
        }
        if (options.debugMode)
            console.dir(resultStr);
        return resultStr;
    });
}
