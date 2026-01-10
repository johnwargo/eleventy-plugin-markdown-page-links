/***********************************************
 * Eleventy Plugin Markdown Page Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

//@ts-ignore
import { UserConfig } from '@11ty/eleventy';

enum ListType {
  Simple,      // 0
  Ordered,     // 1
  Unordered,   // 2
}

type LinkRecord = {
  title: string,
  url: string
}

type ModuleOptions = {
  debugMode?: boolean,
  collapsible?: boolean,
  externalLinksOnly?: boolean,
  listClass?: string,
  listType?: ListType,
  minimumLinks?: number,
  openInNewTab?: boolean,
  sectionTitle?: string,
}

const defaultConfig: ModuleOptions = {
  'debugMode': false,
  'collapsible': false,
  'externalLinksOnly': false,
  'listClass': '',
  'listType': 0,
  'minimumLinks': 0,
  'openInNewTab': true,
  'sectionTitle': 'Links',
}

const PLUGIN_NAME = 'Eleventy-Plugin-Markdown-Page-Links';
const regex = /\!*\[([^\]]+)\]\(([^)]+)\)/g;

function buildLinkList(links: LinkRecord[], delimiter: string, newWindow: boolean, debugMode: boolean): string {
  if (debugMode) console.log(`Building link list with delimiter: ${delimiter}, newWindow: ${newWindow}`);
  var resultStr = '';
  links.forEach((link) => {
    if (debugMode) console.dir(link);
    resultStr += `<${delimiter}><a href="${link.url}"${newWindow ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.title}</a></${delimiter}>\n`;
  });

  return resultStr;
}

export default function (eleventyConfig: UserConfig, options: ModuleOptions = {}) {

  // Merge the user options with the default config
  options = { ...defaultConfig, ...options };
  if (options.debugMode) {
    console.log('Options');
    console.table(options);
  }

  eleventyConfig.addShortcode("pageLinks", function (listType?: ListType, minimumLinks?: number, openInNewTab?: boolean, externalLinksOnly?: boolean, listClass?: string, collapsible?: boolean, sectionTitle?: string, debugMode?: boolean) {

    var content: string;
    var link: LinkRecord;
    var links: LinkRecord[] = [];
    var match;
    var resultStr: string;

    // Replace undefined options with those from the module config
    listType = listType ?? options.listType;
    minimumLinks = minimumLinks ?? options.minimumLinks;
    openInNewTab = openInNewTab ?? options.openInNewTab;
    externalLinksOnly = externalLinksOnly ?? options.externalLinksOnly;
    listClass = listClass ?? options.listClass;
    collapsible = collapsible ?? options.collapsible;
    sectionTitle = sectionTitle ?? options.sectionTitle;
    debugMode = debugMode ?? options.debugMode;

    // check the passed-in config options
    if (listType! < 0 || listType! > 2) {
      return `${PLUGIN_NAME} Error: Invalid list type specified (${listType}).`;
    }

    // get the page content and extract the links
    //@ts-ignore
    content = this.page.rawInput;
    while ((match = regex.exec(content)) !== null) {
      link = {
        title: match[1].trim(),
        url: match[2].trim()
      };

      // if externalLinksOnly is set, skip internal links
      //@ts-ignore
      if (externalLinksOnly && (link.url.startsWith('/') || link.url.startsWith('#') || link.url.startsWith(this.page.url))) {
        if (debugMode) console.log(`${PLUGIN_NAME} Skipping internal link: ${link.url}`);
        continue;
      }

      // is the link already in links?
      if (links.findIndex(l => l.url === link.url) !== -1) {
        if (debugMode) console.log(`${PLUGIN_NAME} Duplicate link found, skipping: ${link.url}`);
        continue;
      }
      links.push(link);
    }

    if (debugMode && links.length > 0) console.dir(links);

    resultStr = '';
    // Do we have at least the minimum number of links?
    if (links.length > 0 && links.length >= minimumLinks!) {
      // Then build the link list
      if (collapsible) {
        resultStr += `<details>\n<summary>${sectionTitle}</summary>\n`;
      }
      switch (listType) {
        case ListType.Ordered:
          if (debugMode) console.log(`${PLUGIN_NAME} Building ordered list`);
          resultStr += `<ol${listClass ? ` class="${listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'li', openInNewTab!, debugMode!);
          resultStr += '</ol>\n';
          break;
        case ListType.Unordered:
          if (debugMode) console.log(`${PLUGIN_NAME} Building unordered list`);
          resultStr += `<ul${listClass ? ` class="${listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'li', openInNewTab!, debugMode!);
          resultStr += '</ul>\n';
          break;
        default:
          if (debugMode) console.log(`${PLUGIN_NAME} Building div link list`);
          resultStr += `<div${listClass ? ` class="${listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'p', openInNewTab!, debugMode!);
          resultStr += '</div>\n';
          break;
      }
      if (collapsible) {
        resultStr += `</details>\n`;
      }
    }
    if (debugMode) console.dir(resultStr);
    return resultStr;
  });

}