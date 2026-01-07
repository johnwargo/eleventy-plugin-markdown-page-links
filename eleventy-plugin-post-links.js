import logger from 'cli-logger';
const APP_NAME = 'Eleventy-Plugin-Post-Links';
var conf = { console: true, level: logger.INFO };
conf.prefix = function (record) {
    return `[${APP_NAME}]`;
};
var log = logger(conf);
export default function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("postLinks", function () {
        const debugMode = options.debugMode || false;
        log.level(debugMode ? log.DEBUG : log.INFO);
        log.debug('Debug mode enabled\n');
        return "<< Post Links Section >>";
    });
}
