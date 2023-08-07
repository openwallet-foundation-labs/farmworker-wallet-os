import type { TransportSession } from './TransportService';
import type { ConnectionRecord } from '../modules/connections';
import type { InboundTransport } from '../transport';
import { Logger } from '../logger';
import { ConnectionService } from '../modules/connections';
import { Dispatcher } from './Dispatcher';
import { EnvelopeService } from './EnvelopeService';
import { MessageHandlerRegistry } from './MessageHandlerRegistry';
import { MessageSender } from './MessageSender';
import { TransportService } from './TransportService';
import { AgentContextProvider } from './context';
export declare class MessageReceiver {
    private envelopeService;
    private transportService;
    private messageSender;
    private dispatcher;
    private logger;
    private connectionService;
    private messageHandlerRegistry;
    private agentContextProvider;
    private _inboundTransports;
    constructor(envelopeService: EnvelopeService, transportService: TransportService, messageSender: MessageSender, connectionService: ConnectionService, dispatcher: Dispatcher, messageHandlerRegistry: MessageHandlerRegistry, agentContextProvider: AgentContextProvider, logger: Logger);
    get inboundTransports(): InboundTransport[];
    registerInboundTransport(inboundTransport: InboundTransport): void;
    unregisterInboundTransport(inboundTransport: InboundTransport): Promise<void>;
    /**
     * Receive and handle an inbound DIDComm message. It will determine the agent context, decrypt the message, transform it
     * to it's corresponding message class and finally dispatch it to the dispatcher.
     *
     * @param inboundMessage the message to receive and handle
     */
    receiveMessage(inboundMessage: unknown, { session, connection, contextCorrelationId, }?: {
        session?: TransportSession;
        connection?: ConnectionRecord;
        contextCorrelationId?: string;
    }): Promise<void>;
    private receivePlaintextMessage;
    private receiveEncryptedMessage;
    /**
     * Decrypt a message using the envelope service.
     *
     * @param message the received inbound message to decrypt
     */
    private decryptMessage;
    private isPlaintextMessage;
    private isEncryptedMessage;
    private transformAndValidate;
    private findConnectionByMessageKeys;
    /**
     * Transform an plaintext DIDComm message into it's corresponding message class. Will look at all message types in the registered handlers.
     *
     * @param message the plaintext message for which to transform the message in to a class instance
     */
    private transformMessage;
    /**
     * Send the problem report message (https://didcomm.org/notification/1.0/problem-report) to the recipient.
     * @param message error message to send
     * @param connection connection to send the message to
     * @param plaintextMessage received inbound message
     */
    private sendProblemReportMessage;
}
