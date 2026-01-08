/***********************************************
 * Eleventy Plugin Markdown Page Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

//@ts-ignore
import { UserConfig } from '@11ty/eleventy';

enum LinkType {
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
  listType?: LinkType,
  minimumLinks?: number,
  openInNewTab?: boolean,
  sectionTitle?: string,
}

const defaultConfig: ModuleOptions = {
  'debugMode': true,
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

function buildLinkList(links: LinkRecord[], delimiter: string, newWindow: boolean = false): string {
  console.log(`Building link list with delimiter: ${delimiter}, newWindow: ${newWindow}`);
  var resultStr = '';
  links.forEach((link) => {
    console.dir(link);
    resultStr += `<${delimiter}><a href="${link.url}"${newWindow ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.title}</a></${delimiter}>`;
  });
  return resultStr;
}

export default function (eleventyConfig: UserConfig ) {

  eleventyConfig.addShortcode("postLinks", function (options: ModuleOptions = {}) {

    var content: string;
    var link: LinkRecord;
    var links: LinkRecord[] = [];
    var match;
    var resultStr: string;

    // check the passed-in config options
    if (options.listType! < 0 || options.listType! > 2) {
      return `${PLUGIN_NAME} Error: Invalid list type specified (${options.listType}).`;
    }

    // Merge the user options with the default config
    options = { ...defaultConfig, ...options };
    if (options.debugMode) {
      console.log('Options');
      console.table(options);
    }

    resultStr = '';

    //@ts-ignore
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

    // Do we have at least the minimum number of links?
    if (links.length >= options.minimumLinks!) {
      // Then build the link list
      switch (options.listType) {
        case LinkType.Ordered:
          console.log('Building ordered list');
          resultStr = `<ol${options.listClass ? ` class="${options.listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'li', options.openInNewTab!);
          resultStr += '</ol>\n';
          break;
        case LinkType.Unordered:
          console.log('Building unordered list');
          resultStr = `<ul${options.listClass ? ` class="${options.listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'li', options.openInNewTab!);
          resultStr += '</ul>\n';
          break;
        default:
          console.log('Building div link list');
          resultStr = `<div${options.listClass ? ` class="${options.listClass}"` : ''}>\n`;
          resultStr += buildLinkList(links, 'p', options.openInNewTab!);
          resultStr += '</div>\n';
          break;
      }
    }
    if (options.debugMode) console.dir(resultStr);
    return resultStr;
  });

}