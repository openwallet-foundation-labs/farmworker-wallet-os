import type { JwaSignatureAlgorithm } from '../../../crypto';
import type { TagsBase } from '../../../storage/BaseRecord';
import { BaseRecord } from '../../../storage/BaseRecord';
export type DefaultSdJwtVcRecordTags = {
    vct: string;
    /**
     * The sdAlg is the alg used for creating digests for selective disclosures
     */
    sdAlg: string;
    /**
     * The alg is the alg used to sign the SD-JWT
     */
    alg: JwaSignatureAlgorithm;
};
export type SdJwtVcRecordStorageProps = {
    id?: string;
    createdAt?: Date;
    tags?: TagsBase;
    compactSdJwtVc: string;
};
export declare class SdJwtVcRecord extends BaseRecord<DefaultSdJwtVcRecordTags> {
    static readonly type = "SdJwtVcRecord";
    readonly type = "SdJwtVcRecord";
    compactSdJwtVc: string;
    constructor(props: SdJwtVcRecordStorageProps);
    getTags(): {
        vct: string;
        sdAlg: string;
        alg: JwaSignatureAlgorithm;
    };
    clone(): this;
}
