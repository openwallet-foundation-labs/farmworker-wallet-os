/**
 * Represents `[field]~sig` decorator
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0234-signature-decorator/README.md
 */
export declare class SignatureDecorator {
    constructor(options: SignatureDecorator);
    signatureType: string;
    signatureData: string;
    signer: string;
    signature: string;
}
