"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSync = void 0;
var fs_1 = __importDefault(require("fs"));
var plist_1 = __importDefault(require("plist"));
function writeFileSync(aFile, anObject, options) {
    var data = plist_1.default.build(anObject);
    return fs_1.default.writeFileSync(aFile, data, options);
}
exports.writeFileSync = writeFileSync;
