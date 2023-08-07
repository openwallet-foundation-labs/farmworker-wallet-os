"use strict";
/**
 * Copyright 2015 Blake Embrey
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
/

/**
 * Original code is from project <https://github.com/blakeembrey/make-error-cause>.
 *
 * Changes to the original code:
 * - Use inspect from `object-inspect` insted of Node.js `util` module.
 * - Change `inspect()` method signature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullStack = exports.BaseError = exports.SEPARATOR_TEXT = void 0;
const make_error_1 = __importDefault(require("make-error"));
const object_inspect_1 = __importDefault(require("object-inspect"));
/**
 * @internal
 */
exports.SEPARATOR_TEXT = `\n\nThe following exception was the direct cause of the above exception:\n\n`;
/**
 * Create a new error instance of `cause` property support.
 */
class BaseError extends make_error_1.default.BaseError {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        Object.defineProperty(this, 'cause', {
            value: cause,
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }
    inspect() {
        return fullStack(this);
    }
}
exports.BaseError = BaseError;
/**
 * Capture the full stack trace of any error instance.
 */
function fullStack(error) {
    const chain = [];
    let cause = error;
    while (cause) {
        chain.push(cause);
        cause = cause.cause;
    }
    return chain.map((err) => (0, object_inspect_1.default)(err, { customInspect: false })).join(exports.SEPARATOR_TEXT);
}
exports.fullStack = fullStack;
//# sourceMappingURL=BaseError.js.map