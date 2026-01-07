const APP_NAME = 'Eleventy-Plugin-Post-Links';
export default function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("postLinks", function () {
        if (options.collapsible && !options.sectionTitle) {
            return `[${APP_NAME}] When using 'collapsible' option, you must also provide a 'sectionTitle' option.`;
        }
        return "<< Post Links Section >>";
    });
}
