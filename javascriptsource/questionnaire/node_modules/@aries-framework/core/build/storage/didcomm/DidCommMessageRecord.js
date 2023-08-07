"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidCommMessageRecord = void 0;
const error_1 = require("../../error");
const JsonTransformer_1 = require("../../utils/JsonTransformer");
const messageType_1 = require("../../utils/messageType");
const type_1 = require("../../utils/type");
const uuid_1 = require("../../utils/uuid");
const BaseRecord_1 = require("../BaseRecord");
class DidCommMessageRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b;
        super();
        this.type = DidCommMessageRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.associatedRecordId = props.associatedRecordId;
            this.role = props.role;
            this.message = props.message;
        }
    }
    getTags() {
        const messageId = this.message['@id'];
        const messageType = this.message['@type'];
        const { protocolName, protocolMajorVersion, protocolMinorVersion, messageName } = (0, messageType_1.parseMessageType)(messageType);
        const thread = this.message['~thread'];
        let threadId = messageId;
        if ((0, type_1.isJsonObject)(thread) && typeof thread.thid === 'string') {
            threadId = thread.thid;
        }
        return Object.assign(Object.assign({}, this._tags), { role: this.role, associatedRecordId: this.associatedRecordId, 
            // Computed properties based on message id and type
            threadId,
            protocolName,
            messageName, protocolMajorVersion: protocolMajorVersion.toString(), protocolMinorVersion: protocolMinorVersion.toString(), messageType,
            messageId });
    }
    getMessageInstance(messageClass) {
        const messageType = (0, messageType_1.parseMessageType)(this.message['@type']);
        if (!(0, messageType_1.canHandleMessageType)(messageClass, messageType)) {
            throw new error_1.AriesFrameworkError('Provided message class type does not match type of stored message');
        }
        return JsonTransformer_1.JsonTransformer.fromJSON(this.message, messageClass);
    }
}
exports.DidCommMessageRecord = DidCommMessageRecord;
DidCommMessageRecord.type = 'DidCommMessageRecord';
//# sourceMappingURL=DidCommMessageRecord.js.map