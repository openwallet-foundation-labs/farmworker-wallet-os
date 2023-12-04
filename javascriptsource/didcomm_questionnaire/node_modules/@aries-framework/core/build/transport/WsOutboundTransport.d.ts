import type { OutboundTransport } from './OutboundTransport';
import type { Agent } from '../agent/Agent';
import type { OutboundPackage } from '../types';
export declare class WsOutboundTransport implements OutboundTransport {
    private transportTable;
    private agent;
    private logger;
    private WebSocketClass;
    supportedSchemes: string[];
    start(agent: Agent): Promise<void>;
    stop(): Promise<void>;
    sendMessage(outboundPackage: OutboundPackage): Promise<void>;
    private hasOpenSocket;
    private resolveSocket;
    private handleMessageEvent;
    private listenOnWebSocketMessages;
    private createSocketConnection;
}
