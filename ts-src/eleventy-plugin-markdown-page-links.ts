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

function buildLinkList(links: LinkRecord[], delimiter: string, newWindow: boolean, collapsible: boolean, sectionTitle: string): string {
  console.log(`Building link list with delimiter: ${delimiter}, newWindow: ${newWindow}`);
  var resultStr = '';
  if (collapsible) {
    resultStr += `<details>\n<summary>${sectionTitle}</summary>\n`;
  }
  links.forEach((link) => {
    // console.dir(link);
    resultStr += `<${delimiter}><a href="${link.url}"${newWindow ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.title}</a></${delimiter}>\n`;
  });
  if (collapsible) {
    resultStr += `</details>\n`;
  }
  return resultStr;
}

export default function (eleventyConfig: UserConfig, options: ModuleOptions = {}) {

  // Merge the user options with the default config
  options = { ...defaultConfig, ...options };
  if (options.debugMode) {
    console.log('Options');
    console.table(options);
  }

  eleventyConfig.addShortcode("postLinks", function (listType?: ListType, minimumLinks?: number, openInNewTab?: boolean, externalLinksOnly?: boolean, listClass?: string, collapsible?: boolean, sectionTitle?: string, debugMode?: boolean) {

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
        title: match[1],
        url: match[2]
      };
      links.push(link);
    }
    if (debugMode && links.length > 0) {
      console.dir(links);
    }

    resultStr = '';
    // Do we have at least the minimum number of links?
    if (links.length >= minimumLinks!) {
      // Then build the link list
      switch (listType) {
        case ListType.Ordered:
          console.log('Building ordered list');
          resultStr = `<ol${listClass ? ` class="${listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'li', openInNewTab!, collapsible!, sectionTitle!);
          resultStr += '</ol>\n';
          break;
        case ListType.Unordered:
          console.log('Building unordered list');
          resultStr = `<ul${listClass ? ` class="${listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'li', openInNewTab!, collapsible!, sectionTitle!);
          resultStr += '</ul>\n';
          break;
        default:
          console.log('Building div link list');
          resultStr = `<div${listClass ? ` class="${listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'p', openInNewTab!, collapsible!, sectionTitle!);
          resultStr += '</div>\n';
          break;
      }
    }
    if (debugMode) console.dir(resultStr);
    return resultStr;
  });

}