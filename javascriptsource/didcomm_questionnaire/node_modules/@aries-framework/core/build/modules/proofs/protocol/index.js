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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofProtocolOptions = exports.BaseProofProtocol = void 0;
__exportStar(require("./v2"), exports);
const ProofProtocolOptions = __importStar(require("./ProofProtocolOptions"));
exports.ProofProtocolOptions = ProofProtocolOptions;
// NOTE: ideally we don't export the BaseProofProtocol, but as the V1ProofProtocol is defined in the
// anoncreds package, we need to export it. We should at some point look at creating a core package which can be used for
// sharing internal types, and when you want to build you own modules, and an agent package, which is the one you use when
// consuming the framework
var BaseProofProtocol_1 = require("./BaseProofProtocol");
Object.defineProperty(exports, "BaseProofProtocol", { enumerable: true, get: function () { return BaseProofProtocol_1.BaseProofProtocol; } });
//# sourceMappingURL=index.js.map