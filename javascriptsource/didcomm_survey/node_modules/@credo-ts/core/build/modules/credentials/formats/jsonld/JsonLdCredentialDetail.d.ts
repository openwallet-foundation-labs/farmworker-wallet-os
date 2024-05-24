import { W3cCredential } from '../../../vc/models/credential/W3cCredential';
import { JsonLdCredentialDetailOptions } from './JsonLdCredentialDetailOptions';
export interface JsonLdCredentialDetailInputOptions {
    credential: W3cCredential;
    options: JsonLdCredentialDetailOptions;
}
/**
 * Class providing validation for the V2 json ld credential as per RFC0593 (used to sign credentials)
 *
 */
export declare class JsonLdCredentialDetail {
    constructor(options: JsonLdCredentialDetailInputOptions);
    credential: W3cCredential;
    options: JsonLdCredentialDetailOptions;
}
