import type { AgentContext } from '../../../../agent';
import type { KeyType } from '../../../../crypto';
import type { Buffer } from '../../../../utils';
import type { DidRegistrar } from '../../domain/DidRegistrar';
import type { DidCreateOptions, DidCreateResult, DidDeactivateResult, DidUpdateResult } from '../../types';
export declare class KeyDidRegistrar implements DidRegistrar {
    readonly supportedMethods: string[];
    create(agentContext: AgentContext, options: KeyDidCreateOptions): Promise<DidCreateResult>;
    update(): Promise<DidUpdateResult>;
    deactivate(): Promise<DidDeactivateResult>;
}
export interface KeyDidCreateOptions extends DidCreateOptions {
    method: 'key';
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
export type KeyDidUpdateOptions = never;
export type KeyDidDeactivateOptions = never;
