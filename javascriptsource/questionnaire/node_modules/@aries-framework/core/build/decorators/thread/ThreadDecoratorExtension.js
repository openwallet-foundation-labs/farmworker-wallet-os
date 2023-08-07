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
exports.ThreadDecorated = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ThreadDecorator_1 = require("./ThreadDecorator");
function ThreadDecorated(Base) {
    class ThreadDecoratorExtension extends Base {
        get threadId() {
            var _a, _b;
            return (_b = (_a = this.thread) === null || _a === void 0 ? void 0 : _a.threadId) !== null && _b !== void 0 ? _b : this.id;
        }
        setThread(options) {
            this.thread = new ThreadDecorator_1.ThreadDecorator(options);
        }
    }
    __decorate([
        (0, class_transformer_1.Expose)({ name: '~thread' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(() => ThreadDecorator_1.ThreadDecorator),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsInstance)(ThreadDecorator_1.ThreadDecorator),
        __metadata("design:type", ThreadDecorator_1.ThreadDecorator)
    ], ThreadDecoratorExtension.prototype, "thread", void 0);
    return ThreadDecoratorExtension;
}
exports.ThreadDecorated = ThreadDecorated;
//# sourceMappingURL=ThreadDecoratorExtension.js.map