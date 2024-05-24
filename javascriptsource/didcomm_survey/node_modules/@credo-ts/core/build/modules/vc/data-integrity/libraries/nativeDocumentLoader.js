"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeDocumentLoader = void 0;
function getNativeDocumentLoader() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const loader = require('@digitalcredentials/jsonld/lib/documentLoaders/node');
    return loader;
}
exports.getNativeDocumentLoader = getNativeDocumentLoader;
//# sourceMappingURL=nativeDocumentLoader.js.map