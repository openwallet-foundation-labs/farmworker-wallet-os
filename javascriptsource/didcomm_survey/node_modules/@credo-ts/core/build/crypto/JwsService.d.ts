import type { Jws, JwsDetachedFormat, JwsFlattenedFormat, JwsGeneralFormat, JwsProtectedHeaderOptions } from './JwsTypes';
import type { Key } from './Key';
import type { Jwk } from './jose/jwk';
import type { AgentContext } from '../agent';
import type { Buffer } from '../utils';
import { JwtPayload } from './jose/jwt';
export declare class JwsService {
    private createJwsBase;
    createJws(agentContext: AgentContext, { payload, key, header, protectedHeaderOptions }: CreateJwsOptions): Promise<JwsGeneralFormat>;
    /**
     *  @see {@link https://www.rfc-editor.org/rfc/rfc7515#section-3.1}
     * */
    createJwsCompact(agentContext: AgentContext, { payload, key, protectedHeaderOptions }: CreateCompactJwsOptions): Promise<string>;
    /**
     * Verify a JWS
     */
    verifyJws(agentContext: AgentContext, { jws, jwkResolver }: VerifyJwsOptions): Promise<VerifyJwsResult>;
    private buildProtected;
    private jwkFromJws;
}
export interface CreateJwsOptions {
    key: Key;
    payload: Buffer | JwtPayload;
    header: Record<string, unknown>;
    protectedHeaderOptions: JwsProtectedHeaderOptions;
}
type CreateCompactJwsOptions = Omit<CreateJwsOptions, 'header'>;
export interface VerifyJwsOptions {
    jws: Jws;
    jwkResolver?: JwsJwkResolver;
}
export type JwsJwkResolver = (options: {
    jws: JwsDetachedFormat;
    payload: string;
    protectedHeader: {
        alg: string;
        jwk?: string;
        kid?: string;
        [key: string]: unknown;
    };
}) => Promise<Jwk> | Jwk;
export interface VerifyJwsResult {
    isValid: boolean;
    signerKeys: Key[];
    jws: JwsFlattenedFormat;
}
export {};
