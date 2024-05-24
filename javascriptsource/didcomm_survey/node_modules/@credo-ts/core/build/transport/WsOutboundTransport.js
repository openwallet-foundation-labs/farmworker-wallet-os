"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsOutboundTransport = void 0;
const Events_1 = require("../agent/Events");
const CredoError_1 = require("../error/CredoError");
const utils_1 = require("../utils");
const buffer_1 = require("../utils/buffer");
const TransportEventTypes_1 = require("./TransportEventTypes");
class WsOutboundTransport {
    constructor() {
        this.transportTable = new Map();
        this.supportedSchemes = ['ws', 'wss'];
        this.isActive = false;
        // NOTE: Because this method is passed to the event handler this must be a lambda method
        // so 'this' is scoped to the 'WsOutboundTransport' class instance
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.handleMessageEvent = (event) => {
            this.logger.trace('WebSocket message event received.', { url: event.target.url });
            const payload = utils_1.JsonEncoder.fromBuffer(event.data);
            if (!(0, utils_1.isValidJweStructure)(payload)) {
                throw new Error(`Received a response from the other agent but the structure of the incoming message is not a DIDComm message: ${payload}`);
            }
            this.logger.debug('Payload received from mediator:', payload);
            this.agent.events.emit(this.agent.context, {
                type: Events_1.AgentEventTypes.AgentMessageReceived,
                payload: {
                    message: payload,
                },
            });
        };
    }
    async start(agent) {
        this.agent = agent;
        this.logger = agent.config.logger;
        this.logger.debug('Starting WS outbound transport');
        this.WebSocketClass = agent.config.agentDependencies.WebSocketClass;
        this.isActive = true;
    }
    async stop() {
        this.logger.debug('Stopping WS outbound transport');
        this.isActive = false;
        const stillOpenSocketClosingPromises = [];
        this.transportTable.forEach((socket) => {
            socket.removeEventListener('message', this.handleMessageEvent);
            if (socket.readyState !== this.WebSocketClass.CLOSED) {
                stillOpenSocketClosingPromises.push(new Promise((resolve) => socket.once('close', resolve)));
                socket.close();
            }
        });
        // Wait for all open websocket connections to have been closed
        await Promise.all(stillOpenSocketClosingPromises);
    }
    async sendMessage(outboundPackage) {
        const { payload, endpoint, connectionId } = outboundPackage;
        this.logger.debug(`Sending outbound message to endpoint '${endpoint}' over WebSocket transport.`, {
            payload,
        });
        if (!this.isActive) {
            throw new CredoError_1.CredoError('Outbound transport is not active. Not sending message.');
        }
        if (!endpoint) {
            throw new CredoError_1.CredoError("Missing connection or endpoint. I don't know how and where to send the message.");
        }
        const socketId = `${endpoint}-${connectionId}`;
        const isNewSocket = !this.hasOpenSocket(socketId);
        const socket = await this.resolveSocket({ socketId, endpoint, connectionId });
        // If the socket was created for this message and we don't have return routing enabled
        // We can close the socket as it shouldn't return messages anymore
        // make sure to use the socket in a manner that is compliant with the https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        // (React Native) and https://github.com/websockets/ws (NodeJs)
        socket.send(buffer_1.Buffer.from(JSON.stringify(payload)));
        if (isNewSocket && !outboundPackage.responseRequested) {
            socket.close();
        }
    }
    hasOpenSocket(socketId) {
        return this.transportTable.get(socketId) !== undefined;
    }
    async resolveSocket({ socketId, endpoint, connectionId, }) {
        // If we already have a socket connection use it
        let socket = this.transportTable.get(socketId);
        if (!socket || socket.readyState === this.WebSocketClass.CLOSING) {
            if (!endpoint) {
                throw new CredoError_1.CredoError(`Missing endpoint. I don't know how and where to send the message.`);
            }
            socket = await this.createSocketConnection({
                endpoint,
                socketId,
                connectionId,
            });
            this.transportTable.set(socketId, socket);
            this.listenOnWebSocketMessages(socket);
        }
        if (socket.readyState !== this.WebSocketClass.OPEN) {
            throw new CredoError_1.CredoError('Socket is not open.');
        }
        return socket;
    }
    listenOnWebSocketMessages(socket) {
        socket.addEventListener('message', this.handleMessageEvent);
    }
    createSocketConnection({ socketId, endpoint, connectionId, }) {
        return new Promise((resolve, reject) => {
            this.logger.debug(`Connecting to WebSocket ${endpoint}`);
            const socket = new this.WebSocketClass(endpoint);
            socket.onopen = () => {
                this.logger.debug(`Successfully connected to WebSocket ${endpoint}`);
                resolve(socket);
                this.agent.events.emit(this.agent.context, {
                    type: TransportEventTypes_1.TransportEventTypes.OutboundWebSocketOpenedEvent,
                    payload: {
                        socketId,
                        connectionId: connectionId,
                    },
                });
            };
            socket.onerror = (error) => {
                this.logger.debug(`Error while connecting to WebSocket ${endpoint}`, {
                    error,
                });
                reject(error);
            };
            socket.onclose = async () => {
                this.logger.debug(`WebSocket closing to ${endpoint}`);
                socket.removeEventListener('message', this.handleMessageEvent);
                this.transportTable.delete(socketId);
                this.agent.events.emit(this.agent.context, {
                    type: TransportEventTypes_1.TransportEventTypes.OutboundWebSocketClosedEvent,
                    payload: {
                        socketId,
                        connectionId: connectionId,
                    },
                });
            };
        });
    }
}
exports.WsOutboundTransport = WsOutboundTransport;
//# sourceMappingURL=WsOutboundTransport.js.map