import type { DocumentLoaderWithContext } from './data-integrity/libraries/documentLoader';
/**
 * W3cCredentialsModuleConfigOptions defines the interface for the options of the W3cCredentialsModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface W3cCredentialsModuleConfigOptions {
    /**
     * Document loader to use for resolving JSON-LD objects. Takes a {@link AgentContext} as parameter,
     * and must return a {@link DocumentLoader} function.
     *
     * @example
     * ```
     * const myDocumentLoader = (agentContext: AgentContext) => {
     *   return async (url) => {
     *     if (url !== 'https://example.org') throw new Error("I don't know how to load this document")
     *
     *     return {
     *       contextUrl: null,
     *       documentUrl: url,
     *       document: null
     *     }
     *   }
     * }
     * ```
     *
     *
     * @default {@link defaultDocumentLoader}
     */
    documentLoader?: DocumentLoaderWithContext;
}
export declare class W3cCredentialsModuleConfig {
    private options;
    constructor(options?: W3cCredentialsModuleConfigOptions);
    /** See {@link W3cCredentialsModuleConfigOptions.documentLoader} */
    get documentLoader(): DocumentLoaderWithContext;
}
