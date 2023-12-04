"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// Utils for Mixins in TypeScript
// @see https://www.typescriptlang.org/docs/handbook/mixins.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compose = void 0;
/**
 * Apply a list of mixins functions to a base class. Applies extensions in order
 *
 * @param Base Base class
 * @param extensions List of mixin functions that will extend the base class.
 *
 * @example
 * Compose(BaseClass, [TransportDecorated, SignatureDecorated])
 */
function Compose(Base, extensions) {
    // It errors without casting to any, but function + typings works
    return extensions.reduce((extended, extend) => extend(extended), Base);
}
exports.Compose = Compose;
//# sourceMappingURL=mixins.js.map