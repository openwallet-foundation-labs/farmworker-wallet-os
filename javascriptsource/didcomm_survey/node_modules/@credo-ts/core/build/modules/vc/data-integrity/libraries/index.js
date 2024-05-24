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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vcLibraries = void 0;
const jsonld = __importStar(require("./jsonld"));
const jsonldSignatures = __importStar(require("./jsonld-signatures"));
const vc = __importStar(require("./vc"));
// Temporary re-export of vc libraries. As the libraries don't
// have types, it's inconvenient to import them from non-core packages
// as we would have to re-add the types. We re-export these libraries,
// so they can be imported by other packages. In the future we should look
// at proper types for these libraries so we don't have to re-export them.
exports.vcLibraries = {
    jsonldSignatures,
    jsonld: Object.assign(Object.assign({}, jsonld), jsonld.default),
    vc: Object.assign(Object.assign({}, vc), vc.default),
};
//# sourceMappingURL=index.js.map