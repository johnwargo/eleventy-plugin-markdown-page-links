/***********************************************
 * Eleventy Plugin Post Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/
//@ts-ignore
import { UserConfig } from '@11ty/eleventy';
//@ts-ignore
import markdownLinkExtractor from 'markdown-link-extractor';

type ModuleOptions = {
  collapsible?: boolean,
  contentScope?: string,
  externalLinksOnly?: boolean,
  minimumLinks?: number,
  openInNewTab?: boolean,
  orderedList?: boolean,
  sectionTitle?: string,
  debugMode?: boolean
}

const defaultConfig: ModuleOptions = {
  'collapsible': false,
  'contentScope': 'PostLinksScope',
  'externalLinksOnly': false,
  'minimumLinks': 0,
  'openInNewTab': true,
  'orderedList': false,
  'sectionTitle': 'Links',
  'debugMode': true
}

const APP_NAME = 'Eleventy-Plugin-Post-Links';

export default function (eleventyConfig: UserConfig, options: ModuleOptions = {}) {

  eleventyConfig.addShortcode("postLinks", function () {

    // Merge the user options with the default config
    options = { ...defaultConfig, ...options };
    if (options.debugMode) {
      console.log('Options');
      console.table(options);
    }

    if (options.collapsible && !options.sectionTitle) {
      return `[${APP_NAME}] When using 'collapsible' option, you must also provide a 'sectionTitle' option.`;
    }

    //@ts-ignore
    // console.log(this.page.title);
    //@ts-ignore
    // console.dir(this.page);

    //@ts-ignore
    const links = markdownLinkExtractor(this.page.rawInput);
    console.dir(links);

    return "<< Post Links Section >>";
  });

}