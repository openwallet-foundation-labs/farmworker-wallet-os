"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofExchangeRecord = void 0;
const error_1 = require("../../../error");
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
class ProofExchangeRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = ProofExchangeRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.protocolVersion = props.protocolVersion;
            this.isVerified = props.isVerified;
            this.state = props.state;
            this.connectionId = props.connectionId;
            this.threadId = props.threadId;
            this.parentThreadId = props.parentThreadId;
            this.autoAcceptProof = props.autoAcceptProof;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
            this.errorMessage = props.errorMessage;
        }
    }
    getTags() {
        return Object.assign(Object.assign({}, this._tags), { threadId: this.threadId, parentThreadId: this.parentThreadId, connectionId: this.connectionId, state: this.state });
    }
    assertState(expectedStates) {
        if (!Array.isArray(expectedStates)) {
            expectedStates = [expectedStates];
        }
        if (!expectedStates.includes(this.state)) {
            throw new error_1.AriesFrameworkError(`Proof record is in invalid state ${this.state}. Valid states are: ${expectedStates.join(', ')}.`);
        }
    }
    assertProtocolVersion(version) {
        if (this.protocolVersion !== version) {
            throw new error_1.AriesFrameworkError(`Proof record has invalid protocol version ${this.protocolVersion}. Expected version ${version}`);
        }
    }
    assertConnection(currentConnectionId) {
        if (!this.connectionId) {
            throw new error_1.AriesFrameworkError(`Proof record is not associated with any connection. This is often the case with connection-less presentation exchange`);
        }
        else if (this.connectionId !== currentConnectionId) {
            throw new error_1.AriesFrameworkError(`Proof record is associated with connection '${this.connectionId}'. Current connection is '${currentConnectionId}'`);
        }
    }
}
exports.ProofExchangeRecord = ProofExchangeRecord;
ProofExchangeRecord.type = 'ProofRecord';
//# sourceMappingURL=ProofExchangeRecord.js.map