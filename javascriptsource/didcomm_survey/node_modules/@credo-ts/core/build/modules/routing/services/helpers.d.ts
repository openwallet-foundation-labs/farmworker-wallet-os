import type { AgentContext } from '../../../agent';
import type { DidDocument } from '../../dids';
export declare function getMediationRecordForDidDocument(agentContext: AgentContext, didDocument: DidDocument): Promise<import("..").MediationRecord>;
