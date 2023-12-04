import type { ModulesMap } from '../agent/AgentModules';
import type { MessageHandler } from '../agent/MessageHandler';
import type { Constructor } from '../utils/mixins';
import type { DependencyContainer } from 'tsyringe';
import { InjectionToken } from 'tsyringe';
export { InjectionToken };
export declare class DependencyManager {
    readonly container: DependencyContainer;
    readonly registeredModules: ModulesMap;
    constructor(container?: DependencyContainer, registeredModules?: ModulesMap);
    registerModules(modules: ModulesMap): void;
    registerMessageHandlers(messageHandlers: MessageHandler[]): void;
    registerSingleton<T>(from: InjectionToken<T>, to: InjectionToken<T>): void;
    registerSingleton<T>(token: Constructor<T>): void;
    resolve<T>(token: InjectionToken<T>): T;
    registerInstance<T>(token: InjectionToken<T>, instance: T): void;
    isRegistered<T>(token: InjectionToken<T>): boolean;
    registerContextScoped<T = any>(token: Constructor<T>): void;
    registerContextScoped<T = any>(token: InjectionToken<T>, provider: Constructor<T>): void;
    /**
     * Dispose the dependency manager. Calls `.dispose()` on all instances that implement the `Disposable` interface and have
     * been constructed by the `DependencyManager`. This means all instances registered using `registerInstance` won't have the
     * dispose method called.
     */
    dispose(): Promise<void>;
    createChild(): DependencyManager;
}
