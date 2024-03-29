import { PublicKey } from '../publicKey/PublicKey';
import { Authentication } from './Authentication';
export declare class EmbeddedAuthentication extends Authentication {
    publicKey: PublicKey;
    constructor(publicKey: PublicKey);
}
