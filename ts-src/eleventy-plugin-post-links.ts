/***********************************************
 * Eleventy Plugin Post Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

type ModuleOptions = {
  debugMode?: boolean,
  useSection?: boolean,
  sectionTitle?: string
}

const APP_NAME = 'Eleventy-Plugin-Post-Links';

export default function (eleventyConfig: any, options: ModuleOptions = {}) {
  eleventyConfig.addShortcode("postLinks", function () {   
    return "<< Post Links Section >>";
  });

}