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
exports.parseDid = void 0;
__exportStar(require("./service"), exports);
__exportStar(require("./verificationMethod"), exports);
__exportStar(require("./DidDocument"), exports);
__exportStar(require("./DidDocumentBuilder"), exports);
__exportStar(require("./DidDocumentRole"), exports);
__exportStar(require("./DidRegistrar"), exports);
__exportStar(require("./DidResolver"), exports);
__exportStar(require("./key-type"), exports);
var parse_1 = require("./parse");
Object.defineProperty(exports, "parseDid", { enumerable: true, get: function () { return parse_1.parseDid; } });
//# sourceMappingURL=index.js.map