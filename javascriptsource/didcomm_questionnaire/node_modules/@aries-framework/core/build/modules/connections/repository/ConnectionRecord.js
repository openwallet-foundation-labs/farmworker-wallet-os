"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRecord = void 0;
const error_1 = require("../../../error");
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
const models_1 = require("../models");
class ConnectionRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c, _d;
        super();
        this.connectionTypes = [];
        this.type = ConnectionRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.did = props.did;
            this.invitationDid = props.invitationDid;
            this.theirDid = props.theirDid;
            this.theirLabel = props.theirLabel;
            this.state = props.state;
            this.role = props.role;
            this.alias = props.alias;
            this.autoAcceptConnection = props.autoAcceptConnection;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
            this.threadId = props.threadId;
            this.imageUrl = props.imageUrl;
            this.mediatorId = props.mediatorId;
            this.errorMessage = props.errorMessage;
            this.protocol = props.protocol;
            this.outOfBandId = props.outOfBandId;
            this.connectionTypes = (_d = props.connectionTypes) !== null && _d !== void 0 ? _d : [];
        }
    }
    getTags() {
        return Object.assign(Object.assign({}, this._tags), { state: this.state, role: this.role, threadId: this.threadId, mediatorId: this.mediatorId, did: this.did, theirDid: this.theirDid, outOfBandId: this.outOfBandId, invitationDid: this.invitationDid, connectionTypes: this.connectionTypes });
    }
    get isRequester() {
        return this.role === models_1.DidExchangeRole.Requester;
    }
    get rfc0160State() {
        return (0, models_1.rfc0160StateFromDidExchangeState)(this.state);
    }
    get isReady() {
        return this.state && [models_1.DidExchangeState.Completed, models_1.DidExchangeState.ResponseSent].includes(this.state);
    }
    assertReady() {
        if (!this.isReady) {
            throw new error_1.AriesFrameworkError(`Connection record is not ready to be used. Expected ${models_1.DidExchangeState.ResponseSent}, ${models_1.DidExchangeState.ResponseReceived} or ${models_1.DidExchangeState.Completed}, found invalid state ${this.state}`);
        }
    }
    assertState(expectedStates) {
        if (!Array.isArray(expectedStates)) {
            expectedStates = [expectedStates];
        }
        if (!expectedStates.includes(this.state)) {
            throw new error_1.AriesFrameworkError(`Connection record is in invalid state ${this.state}. Valid states are: ${expectedStates.join(', ')}.`);
        }
    }
    assertRole(expectedRole) {
        if (this.role !== expectedRole) {
            throw new error_1.AriesFrameworkError(`Connection record has invalid role ${this.role}. Expected role ${expectedRole}.`);
        }
    }
}
exports.ConnectionRecord = ConnectionRecord;
ConnectionRecord.type = 'ConnectionRecord';
//# sourceMappingURL=ConnectionRecord.js.map