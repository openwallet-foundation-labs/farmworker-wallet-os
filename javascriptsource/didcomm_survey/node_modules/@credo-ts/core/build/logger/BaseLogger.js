"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLogger = void 0;
const Logger_1 = require("./Logger");
class BaseLogger {
    constructor(logLevel = Logger_1.LogLevel.off) {
        this.logLevel = logLevel;
    }
    isEnabled(logLevel) {
        return logLevel >= this.logLevel;
    }
}
exports.BaseLogger = BaseLogger;
//# sourceMappingURL=BaseLogger.js.map