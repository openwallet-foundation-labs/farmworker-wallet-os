import type { AgentContext } from '../../../../agent';
import type { KeyType } from '../../../../crypto';
import type { Buffer } from '../../../../utils';
import type { DidRegistrar } from '../../domain/DidRegistrar';
import type { DidCreateOptions, DidCreateResult, DidDeactivateResult, DidUpdateResult } from '../../types';
import { DidDocument } from '../../domain';
import { PeerDidNumAlgo } from './didPeer';
export declare class PeerDidRegistrar implements DidRegistrar {
    readonly supportedMethods: string[];
    create(agentContext: AgentContext, options: PeerDidNumAlgo0CreateOptions | PeerDidNumAlgo1CreateOptions | PeerDidNumAlgo2CreateOptions | PeerDidNumAlgo4CreateOptions): Promise<DidCreateResult>;
    update(): Promise<DidUpdateResult>;
    deactivate(): Promise<DidDeactivateResult>;
}
export type PeerDidCreateOptions = PeerDidNumAlgo0CreateOptions | PeerDidNumAlgo1CreateOptions | PeerDidNumAlgo2CreateOptions | PeerDidNumAlgo4CreateOptions;
export interface PeerDidNumAlgo0CreateOptions extends DidCreateOptions {
    method: 'peer';
    did?: never;
    didDocument?: never;
    options: {
        keyType: KeyType.Ed25519;
        numAlgo: PeerDidNumAlgo.InceptionKeyWithoutDoc;
    };
    secret?: {
        seed?: Buffer;
        privateKey?: Buffer;
    };
}
export interface PeerDidNumAlgo1CreateOptions extends DidCreateOptions {
    method: 'peer';
    did?: never;
    didDocument: DidDocument;
    options: {
        numAlgo: PeerDidNumAlgo.GenesisDoc;
    };
    secret?: undefined;
}
export interface PeerDidNumAlgo2CreateOptions extends DidCreateOptions {
    method: 'peer';
    did?: never;
    didDocument: DidDocument;
    options: {
        numAlgo: PeerDidNumAlgo.MultipleInceptionKeyWithoutDoc;
    };
    secret?: undefined;
}
export interface PeerDidNumAlgo4CreateOptions extends DidCreateOptions {
    method: 'peer';
    did?: never;
    didDocument: DidDocument;
    options: {
        numAlgo: PeerDidNumAlgo.ShortFormAndLongForm;
    };
    secret?: undefined;
}
export type PeerDidUpdateOptions = never;
export type PeerDidDeactivateOptions = never;
