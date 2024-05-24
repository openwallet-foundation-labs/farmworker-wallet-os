"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandlerRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const messageType_1 = require("../utils/messageType");
let MessageHandlerRegistry = class MessageHandlerRegistry {
    constructor() {
        this.messageHandlers = [];
    }
    registerMessageHandler(messageHandler) {
        this.messageHandlers.push(messageHandler);
    }
    getHandlerForMessageType(messageType) {
        const incomingMessageType = (0, messageType_1.parseMessageType)(messageType);
        for (const handler of this.messageHandlers) {
            for (const MessageClass of handler.supportedMessages) {
                if ((0, messageType_1.canHandleMessageType)(MessageClass, incomingMessageType))
                    return handler;
            }
        }
    }
    getMessageClassForMessageType(messageType) {
        const incomingMessageType = (0, messageType_1.parseMessageType)(messageType);
        for (const handler of this.messageHandlers) {
            for (const MessageClass of handler.supportedMessages) {
                if ((0, messageType_1.canHandleMessageType)(MessageClass, incomingMessageType))
                    return MessageClass;
            }
        }
    }
    /**
     * Returns array of message types that dispatcher is able to handle.
     * Message type format is MTURI specified at https://github.com/hyperledger/aries-rfcs/blob/main/concepts/0003-protocols/README.md#mturi.
     */
    get supportedMessageTypes() {
        return this.messageHandlers
            .reduce((all, cur) => [...all, ...cur.supportedMessages], [])
            .map((m) => m.type);
    }
    /**
     * Returns array of protocol IDs that dispatcher is able to handle.
     * Protocol ID format is PIURI specified at https://github.com/hyperledger/aries-rfcs/blob/main/concepts/0003-protocols/README.md#piuri.
     */
    get supportedProtocolUris() {
        const seenProtocolUris = new Set();
        const protocolUris = this.supportedMessageTypes
            .filter((m) => {
            const has = seenProtocolUris.has(m.protocolUri);
            seenProtocolUris.add(m.protocolUri);
            return !has;
        })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map((_a) => {
            var { messageName, messageTypeUri } = _a, parsedProtocolUri = __rest(_a, ["messageName", "messageTypeUri"]);
            return parsedProtocolUri;
        });
        return protocolUris;
    }
    filterSupportedProtocolsByProtocolUris(parsedProtocolUris) {
        return this.supportedProtocolUris.filter((supportedProtocol) => parsedProtocolUris.some((p) => (0, messageType_1.supportsIncomingDidCommProtocolUri)(supportedProtocol, p)));
    }
};
MessageHandlerRegistry = __decorate([
    (0, tsyringe_1.injectable)()
], MessageHandlerRegistry);
exports.MessageHandlerRegistry = MessageHandlerRegistry;
//# sourceMappingURL=MessageHandlerRegistry.js.map