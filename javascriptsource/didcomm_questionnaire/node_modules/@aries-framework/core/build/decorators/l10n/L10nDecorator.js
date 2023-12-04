"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L10nDecorator = void 0;
/**
 * Represents `~l10n` decorator
 */
class L10nDecorator {
    constructor(partial) {
        this.locale = partial === null || partial === void 0 ? void 0 : partial.locale;
    }
}
exports.L10nDecorator = L10nDecorator;
//# sourceMappingURL=L10nDecorator.js.map