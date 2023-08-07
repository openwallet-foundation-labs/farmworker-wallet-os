"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorRoutingRecord = void 0;
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
class MediatorRoutingRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b;
        super();
        this.type = MediatorRoutingRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.routingKeys = props.routingKeys || [];
        }
    }
    getTags() {
        return this._tags;
    }
}
exports.MediatorRoutingRecord = MediatorRoutingRecord;
MediatorRoutingRecord.type = 'MediatorRoutingRecord';
//# sourceMappingURL=MediatorRoutingRecord.js.map