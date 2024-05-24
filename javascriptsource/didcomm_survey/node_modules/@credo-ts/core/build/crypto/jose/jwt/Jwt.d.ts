import type { Buffer } from '../../../utils';
import type { JwkJson } from '../jwk';
import { JwtPayload } from './JwtPayload';
interface JwtHeader {
    alg: string;
    kid?: string;
    jwk?: JwkJson;
    [key: string]: unknown;
}
export declare class Jwt {
    private static format;
    readonly payload: JwtPayload;
    readonly header: JwtHeader;
    readonly signature: Buffer;
    /**
     * Compact serialization of the JWT. Contains the payload, header, and signature.
     */
    readonly serializedJwt: string;
    private constructor();
    static fromSerializedJwt(serializedJwt: string): Jwt;
}
export {};
