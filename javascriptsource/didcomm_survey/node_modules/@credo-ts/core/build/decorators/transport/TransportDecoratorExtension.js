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
exports.TransportDecorated = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TransportDecorator_1 = require("./TransportDecorator");
function TransportDecorated(Base) {
    class TransportDecoratorExtension extends Base {
        setReturnRouting(type, thread) {
            this.transport = new TransportDecorator_1.TransportDecorator({
                returnRoute: type,
                returnRouteThread: thread,
            });
        }
        hasReturnRouting(threadId) {
            //   transport 'none' or undefined always false
            if (!this.transport || !this.transport.returnRoute || this.transport.returnRoute === TransportDecorator_1.ReturnRouteTypes.none) {
                return false;
            }
            // transport 'all' always true
            else if (this.transport.returnRoute === TransportDecorator_1.ReturnRouteTypes.all)
                return true;
            // transport 'thread' with matching thread id is true
            else if (this.transport.returnRoute === TransportDecorator_1.ReturnRouteTypes.thread && this.transport.returnRouteThread === threadId)
                return true;
            // transport is thread but threadId is either missing or doesn't match. Return false
            return false;
        }
        hasAnyReturnRoute() {
            var _a;
            const returnRoute = (_a = this.transport) === null || _a === void 0 ? void 0 : _a.returnRoute;
            return returnRoute === TransportDecorator_1.ReturnRouteTypes.all || returnRoute === TransportDecorator_1.ReturnRouteTypes.thread;
        }
    }
    __decorate([
        (0, class_transformer_1.Expose)({ name: '~transport' }),
        (0, class_transformer_1.Type)(() => TransportDecorator_1.TransportDecorator),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInstance)(TransportDecorator_1.TransportDecorator),
        __metadata("design:type", TransportDecorator_1.TransportDecorator)
    ], TransportDecoratorExtension.prototype, "transport", void 0);
    return TransportDecoratorExtension;
}
exports.TransportDecorated = TransportDecorated;
//# sourceMappingURL=TransportDecoratorExtension.js.map