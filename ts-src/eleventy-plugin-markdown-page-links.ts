/***********************************************
 * Eleventy Plugin Post Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/
//@ts-ignore
import { UserConfig } from '@11ty/eleventy';

type LinkRecord = {
  title: string,
  url: string
}

type ModuleOptions = {
  collapsible?: boolean,
  // contentScope?: string,
  externalLinksOnly?: boolean,
  minimumLinks?: number,
  openInNewTab?: boolean,
  orderedList?: boolean,
  sectionTitle?: string,
  debugMode?: boolean
}

const defaultConfig: ModuleOptions = {
  'collapsible': false,
  'externalLinksOnly': false,
  'minimumLinks': 0,
  'openInNewTab': true,
  'orderedList': false,
  'sectionTitle': 'Links',
  'debugMode': true
  // Can't do this since we don't have access to the page's HTML content
  // 'contentScope': 'PostLinksScope',
}

// const APP_NAME = 'Eleventy-Plugin-Markdown-Page-Links';
const regex = /\!*\[([^\]]+)\]\(([^)]+)\)/g;

export default function (eleventyConfig: UserConfig, options: ModuleOptions = {}) {

  eleventyConfig.addShortcode("postLinks", function () {

    var content: string;
    var link: LinkRecord;
    var links: LinkRecord[] = [];
    var match;
    var resultStr: string = '';

    // Merge the user options with the default config
    options = { ...defaultConfig, ...options };
    if (options.debugMode) {
      console.log('Options');
      console.table(options);
    }

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
    if (links.length < options.minimumLinks!) {
      // Then build the link list
      

    }
    return resultStr;
  });

}