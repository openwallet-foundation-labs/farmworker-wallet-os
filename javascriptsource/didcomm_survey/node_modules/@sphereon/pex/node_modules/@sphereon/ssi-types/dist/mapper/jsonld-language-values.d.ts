export type LanguageValueClaim = {
    language: string;
    value: string | string[] | number | number[];
};
export declare const isLanguageValueObject: (claim?: unknown) => claim is LanguageValueClaim;
export declare const isLanguageValueObjects: (claim?: unknown) => claim is LanguageValueClaim[];
export declare const toLanguageValueObject: (claim?: unknown) => LanguageValueClaim | undefined;
export declare const toLanguageValueObjects: (claim?: unknown) => LanguageValueClaim[] | undefined;
export declare const mapLanguageValue: (claim?: unknown, opts?: {
    language?: string;
    fallbackToFirstObject?: boolean;
}) => any;
export declare const mapLanguageValues: <T extends object>(claimsOrCredential: T, opts?: {
    language?: string;
    fallbackToFirstObject?: boolean;
    noDeepClone?: boolean;
}) => T;
//# sourceMappingURL=jsonld-language-values.d.ts.map