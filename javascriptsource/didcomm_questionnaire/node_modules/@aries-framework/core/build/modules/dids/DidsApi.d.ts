import type { ImportDidOptions } from './DidsApiOptions';
import type { DidCreateOptions, DidCreateResult, DidDeactivateOptions, DidDeactivateResult, DidResolutionOptions, DidUpdateOptions, DidUpdateResult } from './types';
import { AgentContext } from '../../agent';
import { DidsModuleConfig } from './DidsModuleConfig';
import { DidRepository } from './repository';
import { DidRegistrarService, DidResolverService } from './services';
export declare class DidsApi {
    config: DidsModuleConfig;
    private didResolverService;
    private didRegistrarService;
    private didRepository;
    private agentContext;
    constructor(didResolverService: DidResolverService, didRegistrarService: DidRegistrarService, didRepository: DidRepository, agentContext: AgentContext, config: DidsModuleConfig);
    /**
     * Resolve a did to a did document.
     *
     * Follows the interface as defined in https://w3c-ccg.github.io/did-resolution/
     */
    resolve(didUrl: string, options?: DidResolutionOptions): Promise<import("./types").DidResolutionResult>;
    /**
     * Create, register and store a did and did document.
     *
     * Follows the interface as defined in https://identity.foundation/did-registration
     */
    create<CreateOptions extends DidCreateOptions = DidCreateOptions>(options: CreateOptions): Promise<DidCreateResult>;
    /**
     * Update an existing did document.
     *
     * Follows the interface as defined in https://identity.foundation/did-registration
     */
    update<UpdateOptions extends DidUpdateOptions = DidUpdateOptions>(options: UpdateOptions): Promise<DidUpdateResult>;
    /**
     * Deactivate an existing did.
     *
     * Follows the interface as defined in https://identity.foundation/did-registration
     */
    deactivate<DeactivateOptions extends DidDeactivateOptions = DidDeactivateOptions>(options: DeactivateOptions): Promise<DidDeactivateResult>;
    /**
     * Resolve a did to a did document. This won't return the associated metadata as defined
     * in the did resolution specification, and will throw an error if the did document could not
     * be resolved.
     */
    resolveDidDocument(didUrl: string): Promise<import("./domain").DidDocument>;
    /**
     * Get a list of all dids created by the agent. This will return a list of {@link DidRecord} objects.
     * Each document will have an id property with the value of the did. Optionally, it will contain a did document,
     * but this is only for documents that can't be resolved from the did itself or remotely.
     *
     * You can call `${@link DidsModule.resolve} to resolve the did document based on the did itself.
     */
    getCreatedDids({ method, did }?: {
        method?: string;
        did?: string;
    }): Promise<import("./repository").DidRecord[]>;
    /**
     * Import an existing did that was created outside of the DidsApi. This will create a `DidRecord` for the did
     * and will allow the did to be used in other parts of the agent. If you need to create a new did document,
     * you can use the {@link DidsApi.create} method to create and register the did.
     *
     * If no `didDocument` is provided, the did document will be resolved using the did resolver. You can optionally provide a list
     * of private key buffer with the respective private key bytes. These keys will be stored in the wallet, and allows you to use the
     * did for other operations. Providing keys that already exist in the wallet is allowed, and those keys will be skipped from being
     * added to the wallet.
     *
     * By default, this method will throw an error if the did already exists in the wallet. You can override this behavior by setting
     * the `overwrite` option to `true`. This will update the did document in the record, and allows you to update the did over time.
     */
    import({ did, didDocument, privateKeys, overwrite }: ImportDidOptions): Promise<void>;
}
