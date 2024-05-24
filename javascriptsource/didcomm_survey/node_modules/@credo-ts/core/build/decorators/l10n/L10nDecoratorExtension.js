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
exports.L10nDecorated = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const L10nDecorator_1 = require("./L10nDecorator");
function L10nDecorated(Base) {
    class L10nDecoratorExtension extends Base {
        addLocale(locale) {
            this.l10n = new L10nDecorator_1.L10nDecorator({
                locale,
            });
        }
        getLocale() {
            var _a;
            if ((_a = this.l10n) === null || _a === void 0 ? void 0 : _a.locale)
                return this.l10n.locale;
            return undefined;
        }
    }
    __decorate([
        (0, class_transformer_1.Expose)({ name: '~l10n' }),
        (0, class_transformer_1.Type)(() => L10nDecorator_1.L10nDecorator),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInstance)(L10nDecorator_1.L10nDecorator),
        __metadata("design:type", L10nDecorator_1.L10nDecorator)
    ], L10nDecoratorExtension.prototype, "l10n", void 0);
    return L10nDecoratorExtension;
}
exports.L10nDecorated = L10nDecorated;
//# sourceMappingURL=L10nDecoratorExtension.js.map