import type { Module, DependencyManager, ApiModule } from '../plugins';
import type { IsAny } from '../types';
import type { Constructor } from '../utils/mixins';
import { BasicMessagesModule } from '../modules/basic-messages';
import { CacheModule } from '../modules/cache';
import { ConnectionsModule } from '../modules/connections';
import { CredentialsModule } from '../modules/credentials';
import { DidsModule } from '../modules/dids';
import { DiscoverFeaturesModule } from '../modules/discover-features';
import { GenericRecordsModule } from '../modules/generic-records';
import { MessagePickupModule } from '../modules/message-pìckup';
import { OutOfBandModule } from '../modules/oob';
import { ProofsModule } from '../modules/proofs';
import { MediationRecipientModule, MediatorModule } from '../modules/routing';
import { W3cCredentialsModule } from '../modules/vc';
import { WalletModule } from '../wallet';
/**
 * Simple utility type that represent a map of modules. This is used to map from moduleKey (api key) to the api in the framework.
 */
export type ModulesMap = {
    [key: string]: Module;
};
export type EmptyModuleMap = {};
/**
 * Default modules can be optionally defined to provide custom configuration. This type makes it so that it is not
 * possible to use a different key for the default modules
 */
export type AgentModulesInput = Partial<DefaultAgentModulesInput> & ModulesMap;
/**
 * Defines the input type for the default agent modules. This is overwritten as we
 * want the input type to allow for generics to be passed in for the credentials module.
 */
export type DefaultAgentModulesInput = Omit<DefaultAgentModules, 'credentials' | 'proofs'> & {
    credentials: CredentialsModule<any>;
    proofs: ProofsModule<any>;
};
/**
 * Type that represents the default agent modules. This is the {@link ModulesMap} variant for the default modules in the framework.
 * It uses the return type of the {@link getDefaultAgentModules} method to automatically infer which modules are always available on
 * the agent and in the agent. namespace.
 */
export type DefaultAgentModules = {
    [moduleKey in keyof ReturnType<typeof getDefaultAgentModules>]: ReturnType<ReturnType<typeof getDefaultAgentModules>[moduleKey]>;
};
export type WithoutDefaultModules<Modules extends ModulesMap> = {
    [moduleKey in Exclude<keyof Modules, keyof DefaultAgentModules>]: Modules[moduleKey];
};
/**
 * Type that represents the api object of the agent (`agent.xxx`). It will extract all keys of the modules and map this to the
 * registered {@link Module.api} class instance. If the module does not have an api class registered, the property will be removed
 * and won't be available on the api object.
 *
 * @example
 * If the following AgentModules type was passed:
 * ```ts
 * {
 *   connections: ConnectionsModule
 *   indy: IndyModule
 * }
 * ```
 *
 * And we use the `AgentApi` type like this:
 * ```ts
 * type MyAgentApi = AgentApi<{
 *   connections: ConnectionsModule
 *   indy: IndyModule
 * }>
 * ```
 *
 * the resulting agent api will look like:
 *
 * ```ts
 * {
 *   connections: ConnectionsApi
 * }
 * ```
 *
 * The `indy` module has been ignored because it doesn't define an api class.
 */
export type AgentApi<Modules extends ModulesMap> = {
    [moduleKey in keyof Modules as Modules[moduleKey]['api'] extends Constructor<unknown> ? moduleKey : never]: Modules[moduleKey]['api'] extends Constructor<unknown> ? InstanceType<Modules[moduleKey]['api']> : never;
};
/**
 * Returns the `api` type from the CustomModuleType if the module is an ApiModule. If the module is not defined
 * which is the case if you don't configure a default agent module (e.g. credentials module), it will use the default
 * module type and use that for the typing. This will contain the default typing, and thus provide the correct agent api
 * interface
 */
export type CustomOrDefaultApi<CustomModuleType, DefaultModuleType extends ApiModule> = IsAny<CustomModuleType> extends true ? InstanceType<DefaultModuleType['api']> : CustomModuleType extends ApiModule ? InstanceType<CustomModuleType['api']> : CustomModuleType extends Module ? never : InstanceType<DefaultModuleType['api']>;
/**
 * Method to get the default agent modules to be registered on any agent instance. It doens't configure the modules in any way,
 * and if that's needed the user needs to provide the module in the agent constructor
 */
declare function getDefaultAgentModules(): {
    readonly connections: () => ConnectionsModule;
    readonly credentials: () => CredentialsModule<[]>;
    readonly proofs: () => ProofsModule<import("../modules/proofs").DefaultProofProtocols>;
    readonly mediator: () => MediatorModule;
    readonly mediationRecipient: () => MediationRecipientModule;
    readonly messagePickup: () => MessagePickupModule<import("../modules/message-p\u00ECckup").DefaultMessagePickupProtocols>;
    readonly basicMessages: () => BasicMessagesModule;
    readonly genericRecords: () => GenericRecordsModule;
    readonly discovery: () => DiscoverFeaturesModule;
    readonly dids: () => DidsModule;
    readonly wallet: () => WalletModule;
    readonly oob: () => OutOfBandModule;
    readonly w3cCredentials: () => W3cCredentialsModule;
    readonly cache: () => CacheModule;
};
/**
 * Extend the provided modules object with the default agent modules. If the modules property already contains a module with the same
 * name as a default module, the module won't be added to the extended module object. This allows users of the framework to override
 * the modules with custom configuration. The agent constructor type ensures you can't provide a different module for a key that registered
 * on the default agent.
 */
export declare function extendModulesWithDefaultModules<AgentModules extends AgentModulesInput>(modules?: AgentModules): AgentModules & DefaultAgentModules;
/**
 * Get the agent api object based on the modules registered in the dependency manager. For each registered module on the
 * dependency manager, the method will extract the api class from the module, resolve it and assign it to the module key
 * as provided in the agent constructor (or the {@link getDefaultAgentModules} method).
 *
 * Modules that don't have an api class defined ({@link Module.api} is undefined) will be ignored and won't be added to the
 * api object.
 *
 * If the api of a module is passed in the `excluded` array, the api will not be added to the resulting api object.
 *
 * @example
 * If the dependency manager has the following modules configured:
 * ```ts
 * {
 *   connections: ConnectionsModule
 *   indy: IndyModule
 * }
 * ```
 *
 * And we call the `getAgentApi` method like this:
 * ```ts
 * const api = getAgentApi(dependencyManager)
 * ```
 *
 * the resulting agent api will look like:
 *
 * ```ts
 * {
 *   connections: ConnectionsApi
 * }
 * ```
 *
 * The `indy` module has been ignored because it doesn't define an api class.
 */
export declare function getAgentApi<AgentModules extends ModulesMap>(dependencyManager: DependencyManager, excludedApis?: unknown[]): AgentApi<AgentModules>;
export {};
