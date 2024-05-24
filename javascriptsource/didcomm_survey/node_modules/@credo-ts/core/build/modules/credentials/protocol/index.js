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
exports.CredentialProtocolOptions = exports.BaseCredentialProtocol = void 0;
__exportStar(require("./v2"), exports);
__exportStar(require("./revocation-notification"), exports);
const CredentialProtocolOptions = __importStar(require("./CredentialProtocolOptions"));
exports.CredentialProtocolOptions = CredentialProtocolOptions;
// NOTE: ideally we don't export the BaseCredentialProtocol, but as the V1CredentialProtocol is defined in the
// anoncreds package, we need to export it. We should at some point look at creating a core package which can be used for
// sharing internal types, and when you want to build you own modules, and an agent package, which is the one you use when
// consuming the framework
var BaseCredentialProtocol_1 = require("./BaseCredentialProtocol");
Object.defineProperty(exports, "BaseCredentialProtocol", { enumerable: true, get: function () { return BaseCredentialProtocol_1.BaseCredentialProtocol; } });
//# sourceMappingURL=index.js.map