"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectAll = exports.injectable = exports.inject = void 0;
__exportStar(require("./DependencyManager"), exports);
__exportStar(require("./Module"), exports);
var tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return tsyringe_1.inject; } });
Object.defineProperty(exports, "injectable", { enumerable: true, get: function () { return tsyringe_1.injectable; } });
Object.defineProperty(exports, "injectAll", { enumerable: true, get: function () { return tsyringe_1.injectAll; } });
//# sourceMappingURL=index.js.map