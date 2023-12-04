import { PublicKey } from './PublicKey';
export declare class EddsaSaSigSecp256k1 extends PublicKey {
    constructor(options: {
        id: string;
        controller: string;
        publicKeyHex: string;
    });
    type: "Secp256k1VerificationKey2018";
    value: string;
}
