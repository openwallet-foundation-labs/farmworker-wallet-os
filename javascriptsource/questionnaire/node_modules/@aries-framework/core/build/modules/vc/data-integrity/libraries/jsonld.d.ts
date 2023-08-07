export interface JsonLd {
    compact(document: any, context: any, options?: any): any;
    fromRDF(document: any): any;
    frame(document: any, revealDocument: any, options?: any): any;
    canonize(document: any, options?: any): any;
    expand(document: any, options?: any): any;
    getValues(document: any, key: string): any;
    addValue(document: any, key: string, value: any): void;
}
export interface DocumentLoaderResult {
    contextUrl?: string | null;
    documentUrl: string;
    document: Record<string, unknown>;
}
export type DocumentLoader = (url: string) => Promise<DocumentLoaderResult>;
declare const _default: JsonLd;
export default _default;
