import type { OutboundTransport } from './OutboundTransport';
import type { Agent } from '../agent/Agent';
import type { OutboundPackage } from '../types';
export declare class HttpOutboundTransport implements OutboundTransport {
    private agent;
    private logger;
    private fetch;
    supportedSchemes: string[];
    start(agent: Agent): Promise<void>;
    stop(): Promise<void>;
    sendMessage(outboundPackage: OutboundPackage): Promise<void>;
}
