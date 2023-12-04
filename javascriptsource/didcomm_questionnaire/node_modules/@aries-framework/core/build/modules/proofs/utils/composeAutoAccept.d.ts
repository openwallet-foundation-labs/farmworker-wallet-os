import { AutoAcceptProof } from '../models';
/**
 * Returns the proof auto accept config based on priority:
 *	- The record config takes first priority
 *	- Otherwise the agent config
 *	- Otherwise {@link AutoAcceptProof.Never} is returned
 */
export declare function composeAutoAccept(recordConfig?: AutoAcceptProof, agentConfig?: AutoAcceptProof): AutoAcceptProof;
