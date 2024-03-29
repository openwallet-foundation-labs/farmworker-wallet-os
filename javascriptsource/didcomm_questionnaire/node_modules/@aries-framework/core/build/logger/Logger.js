"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["test"] = 0] = "test";
    LogLevel[LogLevel["trace"] = 1] = "trace";
    LogLevel[LogLevel["debug"] = 2] = "debug";
    LogLevel[LogLevel["info"] = 3] = "info";
    LogLevel[LogLevel["warn"] = 4] = "warn";
    LogLevel[LogLevel["error"] = 5] = "error";
    LogLevel[LogLevel["fatal"] = 6] = "fatal";
    LogLevel[LogLevel["off"] = 7] = "off";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=Logger.js.map