import type { Agent } from '../agent/Agent';
export interface InboundTransport {
    start(agent: Agent<any>): Promise<void>;
    stop(): Promise<void>;
}
