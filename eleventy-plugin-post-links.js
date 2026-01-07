const APP_NAME = 'Eleventy-Plugin-Post-Links';
export default function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("postLinks", function () {
        return "<< Post Links Section >>";
    });
}
