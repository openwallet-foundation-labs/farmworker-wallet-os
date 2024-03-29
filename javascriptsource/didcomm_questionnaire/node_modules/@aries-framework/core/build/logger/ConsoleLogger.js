"use strict";
/* eslint-disable no-console,@typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const BaseLogger_1 = require("./BaseLogger");
const Logger_1 = require("./Logger");
const replaceError_1 = require("./replaceError");
class ConsoleLogger extends BaseLogger_1.BaseLogger {
    constructor() {
        super(...arguments);
        // Map our log levels to console levels
        this.consoleLogMap = {
            [Logger_1.LogLevel.test]: 'log',
            [Logger_1.LogLevel.trace]: 'log',
            [Logger_1.LogLevel.debug]: 'debug',
            [Logger_1.LogLevel.info]: 'info',
            [Logger_1.LogLevel.warn]: 'warn',
            [Logger_1.LogLevel.error]: 'error',
            [Logger_1.LogLevel.fatal]: 'error',
        };
    }
    log(level, message, data) {
        // Get console method from mapping
        const consoleLevel = this.consoleLogMap[level];
        // Get logger prefix from log level names in enum
        const prefix = Logger_1.LogLevel[level].toUpperCase();
        // Return early if logging is not enabled for this level
        if (!this.isEnabled(level))
            return;
        // Log, with or without data
        if (data) {
            console[consoleLevel](`${prefix}: ${message}`, JSON.stringify(data, replaceError_1.replaceError, 2));
        }
        else {
            console[consoleLevel](`${prefix}: ${message}`);
        }
    }
    test(message, data) {
        this.log(Logger_1.LogLevel.test, message, data);
    }
    trace(message, data) {
        this.log(Logger_1.LogLevel.trace, message, data);
    }
    debug(message, data) {
        this.log(Logger_1.LogLevel.debug, message, data);
    }
    info(message, data) {
        this.log(Logger_1.LogLevel.info, message, data);
    }
    warn(message, data) {
        this.log(Logger_1.LogLevel.warn, message, data);
    }
    error(message, data) {
        this.log(Logger_1.LogLevel.error, message, data);
    }
    fatal(message, data) {
        this.log(Logger_1.LogLevel.fatal, message, data);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map