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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationRecord = void 0;
const class_transformer_1 = require("class-transformer");
const error_1 = require("../../../error");
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
const MediatorPickupStrategy_1 = require("../MediatorPickupStrategy");
const MediationState_1 = require("../models/MediationState");
class MediationRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c, _d;
        super();
        this.type = MediationRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.connectionId = props.connectionId;
            this.threadId = props.threadId;
            this.recipientKeys = props.recipientKeys || [];
            this.routingKeys = props.routingKeys || [];
            this.state = props.state;
            this.role = props.role;
            this.endpoint = (_c = props.endpoint) !== null && _c !== void 0 ? _c : undefined;
            this.pickupStrategy = props.pickupStrategy;
            this._tags = (_d = props.tags) !== null && _d !== void 0 ? _d : {};
        }
    }
    getTags() {
        return Object.assign(Object.assign({}, this._tags), { state: this.state, role: this.role, connectionId: this.connectionId, threadId: this.threadId, recipientKeys: this.recipientKeys });
    }
    addRecipientKey(recipientKey) {
        this.recipientKeys.push(recipientKey);
    }
    removeRecipientKey(recipientKey) {
        const index = this.recipientKeys.indexOf(recipientKey, 0);
        if (index > -1) {
            this.recipientKeys.splice(index, 1);
            return true;
        }
        return false;
    }
    get isReady() {
        return this.state === MediationState_1.MediationState.Granted;
    }
    assertReady() {
        if (!this.isReady) {
            throw new error_1.AriesFrameworkError(`Mediation record is not ready to be used. Expected ${MediationState_1.MediationState.Granted}, found invalid state ${this.state}`);
        }
    }
    assertState(expectedStates) {
        if (!Array.isArray(expectedStates)) {
            expectedStates = [expectedStates];
        }
        if (!expectedStates.includes(this.state)) {
            throw new error_1.AriesFrameworkError(`Mediation record is in invalid state ${this.state}. Valid states are: ${expectedStates.join(', ')}.`);
        }
    }
    assertRole(expectedRole) {
        if (this.role !== expectedRole) {
            throw new error_1.AriesFrameworkError(`Mediation record has invalid role ${this.role}. Expected role ${expectedRole}.`);
        }
    }
}
MediationRecord.type = 'MediationRecord';
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'Explicit') {
            return MediatorPickupStrategy_1.MediatorPickupStrategy.PickUpV1;
        }
        else {
            return value;
        }
    }),
    __metadata("design:type", String)
], MediationRecord.prototype, "pickupStrategy", void 0);
exports.MediationRecord = MediationRecord;
//# sourceMappingURL=MediationRecord.js.map