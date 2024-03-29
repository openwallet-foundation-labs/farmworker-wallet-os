import { PublicKey } from '../publicKey/PublicKey';
import { Authentication } from './Authentication';
export declare class ReferencedAuthentication extends Authentication {
    constructor(publicKey: PublicKey, type: string);
    type: string;
    publicKey: PublicKey;
}
