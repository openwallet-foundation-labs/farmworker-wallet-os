import type { AgentContext } from '../../../../agent';
import type { KeyType } from '../../../../crypto';
import type { Buffer } from '../../../../utils';
import type { DidRegistrar } from '../../domain/DidRegistrar';
import type { DidCreateOptions, DidCreateResult, DidDeactivateResult, DidUpdateResult } from '../../types';
export declare class JwkDidRegistrar implements DidRegistrar {
    readonly supportedMethods: string[];
    create(agentContext: AgentContext, options: JwkDidCreateOptions): Promise<DidCreateResult>;
    update(): Promise<DidUpdateResult>;
    deactivate(): Promise<DidDeactivateResult>;
}
export interface JwkDidCreateOptions extends DidCreateOptions {
    method: 'jwk';
    did?: never;
    didDocument?: never;
    options: {
        keyType: KeyType;
    };
    secret?: {
        seed?: Buffer;
        privateKey?: Buffer;
    };
}
export type JwkDidUpdateOptions = never;
export type JwkDidDeactivateOptions = never;
