var ListType;
(function (ListType) {
    ListType[ListType["Simple"] = 0] = "Simple";
    ListType[ListType["Ordered"] = 1] = "Ordered";
    ListType[ListType["Unordered"] = 2] = "Unordered";
})(ListType || (ListType = {}));
const defaultConfig = {
    'debugMode': false,
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
function buildLinkList(links, delimiter, newWindow, debugMode) {
    if (debugMode)
        console.log(`Building link list with delimiter: ${delimiter}, newWindow: ${newWindow}`);
    var resultStr = '';
    links.forEach((link) => {
        if (debugMode)
            console.dir(link);
        resultStr += `<${delimiter}><a href="${link.url}"${newWindow ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.title}</a></${delimiter}>\n`;
    });
    return resultStr;
}
export default function (eleventyConfig, options = {}) {
    options = { ...defaultConfig, ...options };
    if (options.debugMode) {
        console.log('Options');
        console.table(options);
    }
    eleventyConfig.addShortcode("postLinks", function (listType, minimumLinks, openInNewTab, externalLinksOnly, listClass, collapsible, sectionTitle, debugMode) {
        var content;
        var link;
        var links = [];
        var match;
        var resultStr;
        listType = listType ?? options.listType;
        minimumLinks = minimumLinks ?? options.minimumLinks;
        openInNewTab = openInNewTab ?? options.openInNewTab;
        externalLinksOnly = externalLinksOnly ?? options.externalLinksOnly;
        listClass = listClass ?? options.listClass;
        collapsible = collapsible ?? options.collapsible;
        sectionTitle = sectionTitle ?? options.sectionTitle;
        debugMode = debugMode ?? options.debugMode;
        if (listType < 0 || listType > 2) {
            return `${PLUGIN_NAME} Error: Invalid list type specified (${listType}).`;
        }
        content = this.page.rawInput;
        while ((match = regex.exec(content)) !== null) {
            link = {
                title: match[1],
                url: match[2]
            };
            links.push(link);
        }
        if (debugMode && links.length > 0) {
            console.dir(links);
        }
        resultStr = '';
        if (links.length >= minimumLinks) {
            if (collapsible) {
                resultStr += `<details>\n<summary>${sectionTitle}</summary>\n`;
            }
            switch (listType) {
                case ListType.Ordered:
                    if (debugMode)
                        console.log(`${PLUGIN_NAME} Building ordered list`);
                    resultStr += `<ol${listClass ? ` class="${listClass}"` : ''}>\n`;
                    resultStr += buildLinkList(links, 'li', openInNewTab, debugMode);
                    resultStr += '</ol>\n';
                    break;
                case ListType.Unordered:
                    if (debugMode)
                        console.log(`${PLUGIN_NAME} Building unordered list`);
                    resultStr += `<ul${listClass ? ` class="${listClass}"` : ''}>\n`;
                    resultStr += buildLinkList(links, 'li', openInNewTab, debugMode);
                    resultStr += '</ul>\n';
                    break;
                default:
                    if (debugMode)
                        console.log(`${PLUGIN_NAME} Building div link list`);
                    resultStr += `<div${listClass ? ` class="${listClass}"` : ''}>\n`;
                    resultStr += buildLinkList(links, 'p', openInNewTab, debugMode);
                    resultStr += '</div>\n';
                    break;
            }
            if (collapsible) {
                resultStr += `</details>\n`;
            }
        }
        if (debugMode)
            console.dir(resultStr);
        return resultStr;
    });
}
