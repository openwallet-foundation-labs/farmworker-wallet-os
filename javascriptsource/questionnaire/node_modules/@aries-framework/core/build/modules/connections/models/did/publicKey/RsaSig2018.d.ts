import { PublicKey } from './PublicKey';
export declare class RsaSig2018 extends PublicKey {
    constructor(options: {
        id: string;
        controller: string;
        publicKeyPem: string;
    });
    type: "RsaVerificationKey2018";
    value: string;
}
