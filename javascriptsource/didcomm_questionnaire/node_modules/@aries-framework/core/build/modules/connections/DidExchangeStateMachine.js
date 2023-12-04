"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidExchangeStateMachine = void 0;
const error_1 = require("../../error");
const messageType_1 = require("../../utils/messageType");
const messages_1 = require("./messages");
const models_1 = require("./models");
class DidExchangeStateMachine {
    static assertCreateMessageState(messageType, record) {
        const rule = this.createMessageStateRules.find((r) => (0, messageType_1.canHandleMessageType)(r.message, messageType));
        if (!rule) {
            throw new error_1.AriesFrameworkError(`Could not find create message rule for ${messageType}`);
        }
        if (rule.state !== record.state || rule.role !== record.role) {
            throw new error_1.AriesFrameworkError(`Record with role ${record.role} is in invalid state ${record.state} to create ${messageType}. Expected state for role ${rule.role} is ${rule.state}.`);
        }
    }
    static assertProcessMessageState(messageType, record) {
        const rule = this.processMessageStateRules.find((r) => (0, messageType_1.canHandleMessageType)(r.message, messageType));
        if (!rule) {
            throw new error_1.AriesFrameworkError(`Could not find create message rule for ${messageType}`);
        }
        if (rule.state !== record.state || rule.role !== record.role) {
            throw new error_1.AriesFrameworkError(`Record with role ${record.role} is in invalid state ${record.state} to process ${messageType}. Expected state for role ${rule.role} is ${rule.state}.`);
        }
    }
    static nextState(messageType, record) {
        const rule = this.createMessageStateRules
            .concat(this.processMessageStateRules)
            .find((r) => (0, messageType_1.canHandleMessageType)(r.message, messageType) && r.role === record.role);
        if (!rule) {
            throw new error_1.AriesFrameworkError(`Could not find create message rule for messageType ${messageType}, state ${record.state} and role ${record.role}`);
        }
        return rule.nextState;
    }
}
exports.DidExchangeStateMachine = DidExchangeStateMachine;
DidExchangeStateMachine.createMessageStateRules = [
    {
        message: messages_1.DidExchangeRequestMessage,
        state: models_1.DidExchangeState.InvitationReceived,
        role: models_1.DidExchangeRole.Requester,
        nextState: models_1.DidExchangeState.RequestSent,
    },
    {
        message: messages_1.DidExchangeResponseMessage,
        state: models_1.DidExchangeState.RequestReceived,
        role: models_1.DidExchangeRole.Responder,
        nextState: models_1.DidExchangeState.ResponseSent,
    },
    {
        message: messages_1.DidExchangeCompleteMessage,
        state: models_1.DidExchangeState.ResponseReceived,
        role: models_1.DidExchangeRole.Requester,
        nextState: models_1.DidExchangeState.Completed,
    },
];
DidExchangeStateMachine.processMessageStateRules = [
    {
        message: messages_1.DidExchangeRequestMessage,
        state: models_1.DidExchangeState.InvitationSent,
        role: models_1.DidExchangeRole.Responder,
        nextState: models_1.DidExchangeState.RequestReceived,
    },
    {
        message: messages_1.DidExchangeResponseMessage,
        state: models_1.DidExchangeState.RequestSent,
        role: models_1.DidExchangeRole.Requester,
        nextState: models_1.DidExchangeState.ResponseReceived,
    },
    {
        message: messages_1.DidExchangeCompleteMessage,
        state: models_1.DidExchangeState.ResponseSent,
        role: models_1.DidExchangeRole.Responder,
        nextState: models_1.DidExchangeState.Completed,
    },
];
//# sourceMappingURL=DidExchangeStateMachine.js.map