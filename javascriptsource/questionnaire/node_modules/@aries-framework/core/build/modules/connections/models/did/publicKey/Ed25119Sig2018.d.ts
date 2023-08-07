import { PublicKey } from './PublicKey';
export declare class Ed25119Sig2018 extends PublicKey {
    constructor(options: {
        id: string;
        controller: string;
        publicKeyBase58: string;
    });
    type: "Ed25519VerificationKey2018";
    value: string;
}
