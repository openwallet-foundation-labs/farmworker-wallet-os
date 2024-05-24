"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map