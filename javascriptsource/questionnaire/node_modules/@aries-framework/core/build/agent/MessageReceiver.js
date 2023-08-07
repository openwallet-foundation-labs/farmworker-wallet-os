"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReceiver = void 0;
const constants_1 = require("../constants");
const error_1 = require("../error");
const connections_1 = require("../modules/connections");
const problem_reports_1 = require("../modules/problem-reports");
const plugins_1 = require("../plugins");
const JWE_1 = require("../utils/JWE");
const JsonTransformer_1 = require("../utils/JsonTransformer");
const messageType_1 = require("../utils/messageType");
const Dispatcher_1 = require("./Dispatcher");
const EnvelopeService_1 = require("./EnvelopeService");
const MessageHandlerRegistry_1 = require("./MessageHandlerRegistry");
const MessageSender_1 = require("./MessageSender");
const TransportService_1 = require("./TransportService");
const models_1 = require("./models");
let MessageReceiver = class MessageReceiver {
    constructor(envelopeService, transportService, messageSender, connectionService, dispatcher, messageHandlerRegistry, agentContextProvider, logger) {
        this._inboundTransports = [];
        this.envelopeService = envelopeService;
        this.transportService = transportService;
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.dispatcher = dispatcher;
        this.messageHandlerRegistry = messageHandlerRegistry;
        this.agentContextProvider = agentContextProvider;
        this.logger = logger;
        this._inboundTransports = [];
    }
    get inboundTransports() {
        return this._inboundTransports;
    }
    registerInboundTransport(inboundTransport) {
        this._inboundTransports.push(inboundTransport);
    }
    async unregisterInboundTransport(inboundTransport) {
        this._inboundTransports = this._inboundTransports.filter((transport) => transport !== inboundTransport);
        await inboundTransport.stop();
    }
    /**
     * Receive and handle an inbound DIDComm message. It will determine the agent context, decrypt the message, transform it
     * to it's corresponding message class and finally dispatch it to the dispatcher.
     *
     * @param inboundMessage the message to receive and handle
     */
    async receiveMessage(inboundMessage, { session, connection, contextCorrelationId, } = {}) {
        this.logger.debug(`Agent received message`);
        // Find agent context for the inbound message
        const agentContext = await this.agentContextProvider.getContextForInboundMessage(inboundMessage, {
            contextCorrelationId,
        });
        try {
            if (this.isEncryptedMessage(inboundMessage)) {
                await this.receiveEncryptedMessage(agentContext, inboundMessage, session);
            }
            else if (this.isPlaintextMessage(inboundMessage)) {
                await this.receivePlaintextMessage(agentContext, inboundMessage, connection);
            }
            else {
                throw new error_1.AriesFrameworkError('Unable to parse incoming message: unrecognized format');
            }
        }
        finally {
            // Always end the session for the agent context after handling the message.
            await agentContext.endSession();
        }
    }
    async receivePlaintextMessage(agentContext, plaintextMessage, connection) {
        const message = await this.transformAndValidate(agentContext, plaintextMessage);
        const messageContext = new models_1.InboundMessageContext(message, { connection, agentContext });
        await this.dispatcher.dispatch(messageContext);
    }
    async receiveEncryptedMessage(agentContext, encryptedMessage, session) {
        const decryptedMessage = await this.decryptMessage(agentContext, encryptedMessage);
        const { plaintextMessage, senderKey, recipientKey } = decryptedMessage;
        this.logger.info(`Received message with type '${plaintextMessage['@type']}', recipient key ${recipientKey === null || recipientKey === void 0 ? void 0 : recipientKey.fingerprint} and sender key ${senderKey === null || senderKey === void 0 ? void 0 : senderKey.fingerprint}`, plaintextMessage);
        const connection = await this.findConnectionByMessageKeys(agentContext, decryptedMessage);
        const message = await this.transformAndValidate(agentContext, plaintextMessage, connection);
        const messageContext = new models_1.InboundMessageContext(message, {
            // Only make the connection available in message context if the connection is ready
            // To prevent unwanted usage of unready connections. Connections can still be retrieved from
            // Storage if the specific protocol allows an unready connection to be used.
            connection: (connection === null || connection === void 0 ? void 0 : connection.isReady) ? connection : undefined,
            senderKey,
            recipientKey,
            agentContext,
        });
        // We want to save a session if there is a chance of returning outbound message via inbound transport.
        // That can happen when inbound message has `return_route` set to `all` or `thread`.
        // If `return_route` defines just `thread`, we decide later whether to use session according to outbound message `threadId`.
        if (senderKey && recipientKey && message.hasAnyReturnRoute() && session) {
            this.logger.debug(`Storing session for inbound message '${message.id}'`);
            const keys = {
                recipientKeys: [senderKey],
                routingKeys: [],
                senderKey: recipientKey,
            };
            session.keys = keys;
            session.inboundMessage = message;
            // We allow unready connections to be attached to the session as we want to be able to
            // use return routing to make connections. This is especially useful for creating connections
            // with mediators when you don't have a public endpoint yet.
            session.connectionId = connection === null || connection === void 0 ? void 0 : connection.id;
            messageContext.sessionId = session.id;
            this.transportService.saveSession(session);
        }
        else if (session) {
            // No need to wait for session to stay open if we're not actually going to respond to the message.
            await session.close();
        }
        await this.dispatcher.dispatch(messageContext);
    }
    /**
     * Decrypt a message using the envelope service.
     *
     * @param message the received inbound message to decrypt
     */
    async decryptMessage(agentContext, message) {
        try {
            return await this.envelopeService.unpackMessage(agentContext, message);
        }
        catch (error) {
            this.logger.error('Error while decrypting message', {
                error,
                encryptedMessage: message,
                errorMessage: error instanceof Error ? error.message : error,
            });
            throw error;
        }
    }
    isPlaintextMessage(message) {
        if (typeof message !== 'object' || message == null) {
            return false;
        }
        // If the message has a @type field we assume the message is in plaintext and it is not encrypted.
        return '@type' in message;
    }
    isEncryptedMessage(message) {
        // If the message does has valid JWE structure, we can assume the message is encrypted.
        return (0, JWE_1.isValidJweStructure)(message);
    }
    async transformAndValidate(agentContext, plaintextMessage, connection) {
        let message;
        try {
            message = await this.transformMessage(plaintextMessage);
        }
        catch (error) {
            if (connection)
                await this.sendProblemReportMessage(agentContext, error.message, connection, plaintextMessage);
            throw error;
        }
        return message;
    }
    async findConnectionByMessageKeys(agentContext, { recipientKey, senderKey }) {
        // We only fetch connections that are sent in AuthCrypt mode
        if (!recipientKey || !senderKey)
            return null;
        // Try to find the did records that holds the sender and recipient keys
        return this.connectionService.findByKeys(agentContext, {
            senderKey,
            recipientKey,
        });
    }
    /**
     * Transform an plaintext DIDComm message into it's corresponding message class. Will look at all message types in the registered handlers.
     *
     * @param message the plaintext message for which to transform the message in to a class instance
     */
    async transformMessage(message) {
        // replace did:sov:BzCbsNYhMrjHiqZDTUASHg;spec prefix for message type with https://didcomm.org
        (0, messageType_1.replaceLegacyDidSovPrefixOnMessage)(message);
        const messageType = message['@type'];
        const MessageClass = this.messageHandlerRegistry.getMessageClassForMessageType(messageType);
        if (!MessageClass) {
            throw new problem_reports_1.ProblemReportError(`No message class found for message type "${messageType}"`, {
                problemCode: problem_reports_1.ProblemReportReason.MessageParseFailure,
            });
        }
        // Cast the plain JSON object to specific instance of Message extended from AgentMessage
        let messageTransformed;
        try {
            messageTransformed = JsonTransformer_1.JsonTransformer.fromJSON(message, MessageClass);
        }
        catch (error) {
            this.logger.error(`Error validating message ${message.type}`, {
                errors: error,
                message: JSON.stringify(message),
            });
            throw new problem_reports_1.ProblemReportError(`Error validating message ${message.type}`, {
                problemCode: problem_reports_1.ProblemReportReason.MessageParseFailure,
            });
        }
        return messageTransformed;
    }
    /**
     * Send the problem report message (https://didcomm.org/notification/1.0/problem-report) to the recipient.
     * @param message error message to send
     * @param connection connection to send the message to
     * @param plaintextMessage received inbound message
     */
    async sendProblemReportMessage(agentContext, message, connection, plaintextMessage) {
        const messageType = (0, messageType_1.parseMessageType)(plaintextMessage['@type']);
        if ((0, messageType_1.canHandleMessageType)(problem_reports_1.ProblemReportMessage, messageType)) {
            throw new error_1.AriesFrameworkError(`Not sending problem report in response to problem report: ${message}`);
        }
        const problemReportMessage = new problem_reports_1.ProblemReportMessage({
            description: {
                en: message,
                code: problem_reports_1.ProblemReportReason.MessageParseFailure,
            },
        });
        problemReportMessage.setThread({
            parentThreadId: plaintextMessage['@id'],
        });
        const outboundMessageContext = new models_1.OutboundMessageContext(problemReportMessage, { agentContext, connection });
        if (outboundMessageContext) {
            await this.messageSender.sendMessage(outboundMessageContext);
        }
    }
};
MessageReceiver = __decorate([
    (0, plugins_1.injectable)(),
    __param(6, (0, plugins_1.inject)(constants_1.InjectionSymbols.AgentContextProvider)),
    __param(7, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [EnvelopeService_1.EnvelopeService,
        TransportService_1.TransportService,
        MessageSender_1.MessageSender,
        connections_1.ConnectionService,
        Dispatcher_1.Dispatcher,
        MessageHandlerRegistry_1.MessageHandlerRegistry, Object, Object])
], MessageReceiver);
exports.MessageReceiver = MessageReceiver;
//# sourceMappingURL=MessageReceiver.js.map