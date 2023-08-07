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
exports.TransportDecorator = exports.ReturnRouteTypes = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const BaseMessage_1 = require("../../agent/BaseMessage");
/**
 * Return route types.
 */
var ReturnRouteTypes;
(function (ReturnRouteTypes) {
    /** No messages should be returned over this connection. */
    ReturnRouteTypes["none"] = "none";
    /**  All messages for this key should be returned over this connection. */
    ReturnRouteTypes["all"] = "all";
    /** Send all messages matching this thread over this connection. */
    ReturnRouteTypes["thread"] = "thread";
})(ReturnRouteTypes = exports.ReturnRouteTypes || (exports.ReturnRouteTypes = {}));
/**
 * Represents `~transport` decorator
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0092-transport-return-route/README.md
 */
class TransportDecorator {
    constructor(partial) {
        this.returnRoute = partial === null || partial === void 0 ? void 0 : partial.returnRoute;
        this.returnRouteThread = partial === null || partial === void 0 ? void 0 : partial.returnRouteThread;
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'return_route' }),
    (0, class_validator_1.IsEnum)(ReturnRouteTypes),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransportDecorator.prototype, "returnRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'return_route_thread' }),
    (0, class_validator_1.ValidateIf)((o) => o.returnRoute === ReturnRouteTypes.thread),
    (0, class_validator_1.Matches)(BaseMessage_1.MessageIdRegExp),
    __metadata("design:type", String)
], TransportDecorator.prototype, "returnRouteThread", void 0);
exports.TransportDecorator = TransportDecorator;
//# sourceMappingURL=TransportDecorator.js.map