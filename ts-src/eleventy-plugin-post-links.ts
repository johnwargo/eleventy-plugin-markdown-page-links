/***********************************************
 * Eleventy Plugin Post Links
 * 
 * By John M. Wargo
 * https://johnwargo.com
 ***********************************************/

//@ts-ignore
import logger from 'cli-logger';

type ModuleOptions = {
  debugMode?: boolean,
  useSection?: boolean,
  sectionTitle?: string
}

const APP_NAME = 'Eleventy-Plugin-Post-Links';

// configure the logger
var conf: any = { console: true, level: logger.INFO };
conf.prefix = function (record: any) {
  return `[${APP_NAME}]`;
}
var log = logger(conf);

export default function (eleventyConfig: any, options: ModuleOptions = {}) {
  eleventyConfig.addShortcode("postLinks", function () {

    const debugMode = options.debugMode || false;
    log.level(debugMode ? log.DEBUG : log.INFO);
    log.debug('Debug mode enabled\n');

    return "<< Post Links Section >>";
  });
  
}