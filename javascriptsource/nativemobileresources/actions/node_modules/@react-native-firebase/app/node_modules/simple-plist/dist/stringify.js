"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
var plist_1 = __importDefault(require("plist"));
function stringify(anObject) {
    return plist_1.default.build(anObject);
}
exports.stringify = stringify;
