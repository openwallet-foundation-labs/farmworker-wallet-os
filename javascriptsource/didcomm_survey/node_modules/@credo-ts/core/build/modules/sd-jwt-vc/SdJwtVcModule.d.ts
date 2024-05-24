import type { Module, DependencyManager } from '../../plugins';
import { SdJwtVcApi } from './SdJwtVcApi';
/**
 * @public
 */
export declare class SdJwtVcModule implements Module {
    readonly api: typeof SdJwtVcApi;
    /**
     * Registers the dependencies of the sd-jwt-vc module on the dependency manager.
     */
    register(dependencyManager: DependencyManager): void;
}
