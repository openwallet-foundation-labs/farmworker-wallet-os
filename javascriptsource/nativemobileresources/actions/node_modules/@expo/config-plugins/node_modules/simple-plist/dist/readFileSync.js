"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileSync = void 0;
var fs_1 = __importDefault(require("fs"));
var parse_1 = require("./parse");
function readFileSync(aFile) {
    var contents = fs_1.default.readFileSync(aFile);
    if (contents.length === 0) {
        return {};
    }
    return (0, parse_1.parse)(contents, aFile);
}
exports.readFileSync = readFileSync;
