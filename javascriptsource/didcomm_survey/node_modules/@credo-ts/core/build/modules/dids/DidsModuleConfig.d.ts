import type { DidRegistrar, DidResolver } from './domain';
/**
 * DidsModuleConfigOptions defines the interface for the options of the DidsModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface DidsModuleConfigOptions {
    /**
     * List of did registrars that should be used by the dids module. The registrar must
     * be an instance of the {@link DidRegistrar} interface.
     *
     * If no registrars are provided, the default registrars will be used. `PeerDidRegistrar` and `KeyDidRegistrar`
     * will ALWAYS be registered, as they are needed for connections, mediation and out of band modules to function.
     * Other did methods can be disabled.
     *
     * @default [KeyDidRegistrar, PeerDidRegistrar, JwkDidRegistrar]
     */
    registrars?: DidRegistrar[];
    /**
     * List of did resolvers that should be used by the dids module. The resolver must
     * be an instance of the {@link DidResolver} interface.
     *
     * If no resolvers are provided, the default resolvers will be used. `PeerDidResolver` and `KeyDidResolver`
     * will ALWAYS be registered, as they are needed for connections, mediation and out of band modules to function.
     * Other did methods can be disabled.
     *
     * @default [WebDidResolver, KeyDidResolver, PeerDidResolver, JwkDidResolver]
     */
    resolvers?: DidResolver[];
}
export declare class DidsModuleConfig {
    private options;
    private _registrars;
    private _resolvers;
    constructor(options?: DidsModuleConfigOptions);
    /** See {@link DidsModuleConfigOptions.registrars} */
    get registrars(): DidRegistrar[];
    addRegistrar(registrar: DidRegistrar): void;
    /** See {@link DidsModuleConfigOptions.resolvers} */
    get resolvers(): DidResolver[];
    addResolver(resolver: DidResolver): void;
}
