import * as jsonld from './jsonld';
import * as jsonldSignatures from './jsonld-signatures';
import * as vc from './vc';
export declare const vcLibraries: {
    jsonldSignatures: typeof jsonldSignatures;
    jsonld: {
        compact(document: any, context: any, options?: any): any;
        fromRDF(document: any): any;
        frame(document: any, revealDocument: any, options?: any): any;
        canonize(document: any, options?: any): any;
        expand(document: any, options?: any): any;
        getValues(document: any, key: string): any;
        addValue(document: any, key: string, value: any): void;
        default: jsonld.JsonLd;
    };
    vc: {
        issue(options: any): Promise<Record<string, unknown>>;
        verifyCredential(options: any): Promise<vc.W3cVerifyCredentialResult>;
        createPresentation(options: any): Promise<Record<string, unknown>>;
        signPresentation(options: any): Promise<Record<string, unknown>>;
        verify(options: any): Promise<vc.W3cVerifyPresentationResult>;
        default: vc.VC;
    };
};
