/***********************************************
 * Eleventy Plugin Post Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

type ModuleOptions = {
  collapsible?: boolean,
  externalLinksOnly?: boolean,
  openInNewTab?: boolean,
  orderedList?: boolean,
  sectionTitle?: string,
  debugMode?: boolean
}

const APP_NAME = 'Eleventy-Plugin-Post-Links';

export default function (eleventyConfig: any, options: ModuleOptions = {}) {
  eleventyConfig.addShortcode("postLinks", function () {

    if (options.collapsible && !options.sectionTitle) {
      return `[${APP_NAME}] When using 'collapsible' option, you must also provide a 'sectionTitle' option.`;
    }

    return "<< Post Links Section >>";
  });

}