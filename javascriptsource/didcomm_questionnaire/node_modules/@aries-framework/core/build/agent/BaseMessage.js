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
exports.BaseMessage = exports.MessageTypeRegExp = exports.MessageIdRegExp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const uuid_1 = require("../utils/uuid");
exports.MessageIdRegExp = /[-_./a-zA-Z0-9]{8,64}/;
exports.MessageTypeRegExp = /(.*?)([a-zA-Z0-9._-]+)\/(\d[^/]*)\/([a-zA-Z0-9._-]+)$/;
class BaseMessage {
    generateId() {
        return (0, uuid_1.uuid)();
    }
}
__decorate([
    (0, class_validator_1.Matches)(exports.MessageIdRegExp),
    (0, class_transformer_1.Expose)({ name: '@id' }),
    __metadata("design:type", String)
], BaseMessage.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: '@type' }),
    (0, class_validator_1.Matches)(exports.MessageTypeRegExp),
    __metadata("design:type", String)
], BaseMessage.prototype, "type", void 0);
exports.BaseMessage = BaseMessage;
//# sourceMappingURL=BaseMessage.js.map