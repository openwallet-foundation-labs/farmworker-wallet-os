"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtocolScheme = void 0;
function getProtocolScheme(url) {
    const [protocolScheme] = url.split(':');
    return protocolScheme;
}
exports.getProtocolScheme = getProtocolScheme;
//# sourceMappingURL=uri.js.map