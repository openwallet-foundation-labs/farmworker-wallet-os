import type { DocumentLoader } from './jsonld';
import type { AgentContext } from '../../../../agent/context/AgentContext';
export type DocumentLoaderWithContext = (agentContext: AgentContext) => DocumentLoader;
export declare function defaultDocumentLoader(agentContext: AgentContext): DocumentLoader;
