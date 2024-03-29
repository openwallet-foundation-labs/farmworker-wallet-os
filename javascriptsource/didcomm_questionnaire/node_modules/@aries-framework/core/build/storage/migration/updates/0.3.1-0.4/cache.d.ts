import type { BaseAgent } from '../../../../agent/BaseAgent';
/**
 * removes the all cache records as used in 0.3.0, as they have been updated to use the new cache interface.
 */
export declare function migrateCacheToV0_4<Agent extends BaseAgent>(agent: Agent): Promise<void>;
