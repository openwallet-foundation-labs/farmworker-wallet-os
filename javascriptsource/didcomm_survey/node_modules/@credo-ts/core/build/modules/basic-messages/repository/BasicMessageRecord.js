"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicMessageRecord = void 0;
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
class BasicMessageRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = BasicMessageRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.content = props.content;
            this.sentTime = props.sentTime;
            this.connectionId = props.connectionId;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
            this.role = props.role;
            this.threadId = props.threadId;
            this.parentThreadId = props.parentThreadId;
        }
    }
    getTags() {
        return Object.assign(Object.assign({}, this._tags), { connectionId: this.connectionId, role: this.role, threadId: this.threadId, parentThreadId: this.parentThreadId });
    }
}
exports.BasicMessageRecord = BasicMessageRecord;
BasicMessageRecord.type = 'BasicMessageRecord';
//# sourceMappingURL=BasicMessageRecord.js.map