"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_logger_1 = __importDefault(require("cli-logger"));
const APP_NAME = 'Eleventy-Plugin-Post-Links';
var conf = { console: true, level: cli_logger_1.default.INFO };
conf.prefix = function (record) {
    return `[${APP_NAME}]`;
};
var log = (0, cli_logger_1.default)(conf);
module.exports = function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("postLinks", function () {
        const debugMode = options.debugMode || false;
        log.level(debugMode ? log.DEBUG : log.INFO);
        log.debug('Debug mode enabled\n');
        return "<< Post Links Section >>";
    });
};
