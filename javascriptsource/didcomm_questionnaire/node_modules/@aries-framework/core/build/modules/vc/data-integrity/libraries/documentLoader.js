"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDocumentLoader = void 0;
const AriesFrameworkError_1 = require("../../../../error/AriesFrameworkError");
const utils_1 = require("../../../../utils");
const dids_1 = require("../../../dids");
const jsonld_1 = __importDefault(require("./jsonld"));
const nativeDocumentLoader_1 = require("./nativeDocumentLoader");
function defaultDocumentLoader(agentContext) {
    const didResolver = agentContext.dependencyManager.resolve(dids_1.DidResolverService);
    async function loader(url) {
        if ((0, utils_1.isDid)(url)) {
            const result = await didResolver.resolve(agentContext, url);
            if (result.didResolutionMetadata.error || !result.didDocument) {
                throw new AriesFrameworkError_1.AriesFrameworkError(`Unable to resolve DID: ${url}`);
            }
            const framed = await jsonld_1.default.frame(result.didDocument.toJSON(), {
                '@context': result.didDocument.context,
                '@embed': '@never',
                id: url,
            }, 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            { documentLoader: this });
            return {
                contextUrl: null,
                documentUrl: url,
                document: framed,
            };
        }
        // fetches the documentLoader from documentLoader.ts or documentLoader.native.ts depending on the platform at bundle time
        const platformLoader = (0, nativeDocumentLoader_1.getNativeDocumentLoader)();
        const nativeLoader = platformLoader.apply(jsonld_1.default, []);
        return await nativeLoader(url);
    }
    return loader.bind(loader);
}
exports.defaultDocumentLoader = defaultDocumentLoader;
//# sourceMappingURL=documentLoader.js.map