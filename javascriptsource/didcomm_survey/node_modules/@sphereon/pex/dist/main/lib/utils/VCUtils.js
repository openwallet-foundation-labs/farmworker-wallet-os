"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterToRestrictedDIDs = exports.isRestrictedDID = exports.uniformDIDMethods = exports.definitionVersionDiscovery = exports.getIssuerString = exports.getSubjectIdsAsString = void 0;
const types_1 = require("../types");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validatePDv1_js_1 = __importDefault(require("../validation/validatePDv1.js"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validatePDv2_js_1 = __importDefault(require("../validation/validatePDv2.js"));
const ObjectUtils_1 = require("./ObjectUtils");
const jsonPathUtils_1 = require("./jsonPathUtils");
function getSubjectIdsAsString(vc) {
    const subjects = Array.isArray(vc.credentialSubject) ? vc.credentialSubject : [vc.credentialSubject];
    return subjects.filter((s) => !!s.id).map((value) => value.id);
}
exports.getSubjectIdsAsString = getSubjectIdsAsString;
function getIssuerString(vc) {
    return ObjectUtils_1.ObjectUtils.isString(vc.issuer) ? vc.issuer : vc.issuer.id;
}
exports.getIssuerString = getIssuerString;
function definitionVersionDiscovery(presentationDefinition) {
    const presentationDefinitionCopy = JSON.parse(JSON.stringify(presentationDefinition));
    jsonPathUtils_1.JsonPathUtils.changePropertyNameRecursively(presentationDefinitionCopy, '_const', 'const');
    jsonPathUtils_1.JsonPathUtils.changePropertyNameRecursively(presentationDefinitionCopy, '_enum', 'enum');
    const data = { presentation_definition: presentationDefinitionCopy };
    let result = (0, validatePDv2_js_1.default)(data);
    if (result) {
        return { version: types_1.PEVersion.v2 };
    }
    result = (0, validatePDv1_js_1.default)(data);
    if (result) {
        return { version: types_1.PEVersion.v1 };
    }
    return { error: 'This is not a valid PresentationDefinition' };
}
exports.definitionVersionDiscovery = definitionVersionDiscovery;
function uniformDIDMethods(dids, opts) {
    var _a;
    let result = (_a = dids === null || dids === void 0 ? void 0 : dids.map((did) => did.toLowerCase()).map((did) => (did.startsWith('did:') ? did : `did:${did}`))) !== null && _a !== void 0 ? _a : [];
    if (opts === null || opts === void 0 ? void 0 : opts.removePrefix) {
        const length = opts.removePrefix.endsWith(':') ? opts.removePrefix.length : opts.removePrefix.length + 1;
        result = result.map((did) => (did.startsWith(opts.removePrefix) ? did.substring(length) : did));
    }
    if (result.includes('did')) {
        // The string did denotes every DID method, hence we return an empty array, indicating all methods are supported
        return [];
    }
    return result;
}
exports.uniformDIDMethods = uniformDIDMethods;
function isRestrictedDID(DID, restrictToDIDMethods) {
    const methods = uniformDIDMethods(restrictToDIDMethods);
    return methods.length === 0 || methods.some((method) => DID.toLowerCase().startsWith(method));
}
exports.isRestrictedDID = isRestrictedDID;
function filterToRestrictedDIDs(DIDs, restrictToDIDMethods) {
    const methods = uniformDIDMethods(restrictToDIDMethods);
    if (methods.length === 0) {
        return DIDs;
    }
    return methods.flatMap((method) => DIDs.filter((DID) => DID.toLowerCase().startsWith(method)));
}
exports.filterToRestrictedDIDs = filterToRestrictedDIDs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlscy9WQ1V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLG9DQUFpRjtBQUNqRiw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiLG9GQUF5RDtBQUN6RCw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiLG9GQUF5RDtBQUV6RCwrQ0FBNEM7QUFDNUMsbURBQWdEO0FBRWhELFNBQWdCLHFCQUFxQixDQUFDLEVBQWU7SUFDbkQsTUFBTSxRQUFRLEdBQThDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoSixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFhLENBQUM7QUFDN0UsQ0FBQztBQUhELHNEQUdDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLEVBQWU7SUFDN0MsT0FBTyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxNQUFpQixDQUFDLENBQUMsQ0FBRSxFQUFFLENBQUMsTUFBa0IsQ0FBQyxFQUFFLENBQUM7QUFDN0YsQ0FBQztBQUZELDBDQUVDO0FBRUQsU0FBZ0IsMEJBQTBCLENBQUMsc0JBQStDO0lBQ3hGLE1BQU0sMEJBQTBCLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7SUFDL0csNkJBQWEsQ0FBQyw2QkFBNkIsQ0FB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