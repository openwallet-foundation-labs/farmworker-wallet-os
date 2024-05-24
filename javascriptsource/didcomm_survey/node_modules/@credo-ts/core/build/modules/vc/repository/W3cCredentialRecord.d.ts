import type { TagsBase } from '../../../storage/BaseRecord';
import { BaseRecord } from '../../../storage/BaseRecord';
import { W3cVerifiableCredential } from '../models';
export interface W3cCredentialRecordOptions {
    id?: string;
    createdAt?: Date;
    credential: W3cVerifiableCredential;
    tags: CustomW3cCredentialTags;
}
export type CustomW3cCredentialTags = TagsBase & {
    /**
     * Expanded types are used for JSON-LD credentials to allow for filtering on the expanded type.
     */
    expandedTypes?: Array<string>;
};
export type DefaultW3cCredentialTags = {
    issuerId: string;
    subjectIds: Array<string>;
    schemaIds: Array<string>;
    contexts: Array<string>;
    givenId?: string;
    claimFormat: W3cVerifiableCredential['claimFormat'];
    proofTypes?: Array<string>;
    cryptosuites?: Array<string>;
    types: Array<string>;
    algs?: Array<string>;
};
export declare class W3cCredentialRecord extends BaseRecord<DefaultW3cCredentialTags, CustomW3cCredentialTags> {
    static readonly type = "W3cCredentialRecord";
    readonly type = "W3cCredentialRecord";
    credential: W3cVerifiableCredential;
    constructor(props: W3cCredentialRecordOptions);
    getTags(): DefaultW3cCredentialTags;
    /**
     * This overwrites the default clone method for records
     * as the W3cRecord has issues with the default clone method
     * due to how W3cJwtVerifiableCredential is implemented. This is
     * a temporary way to make sure the clone still works, but ideally
     * we find an alternative.
     */
    clone(): this;
}
