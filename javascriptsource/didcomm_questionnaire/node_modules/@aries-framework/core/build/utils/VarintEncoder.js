"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarintEncoder = void 0;
const varint_1 = require("varint");
const buffer_1 = require("./buffer");
class VarintEncoder {
    static decode(data) {
        const code = (0, varint_1.decode)(data);
        return [code, varint_1.decode.bytes];
    }
    static encode(int) {
        const target = new buffer_1.Buffer(VarintEncoder.encodingLength(int));
        (0, varint_1.encode)(int, target);
        return target;
    }
    static encodingLength(int) {
        return (0, varint_1.encodingLength)(int);
    }
}
exports.VarintEncoder = VarintEncoder;
//# sourceMappingURL=VarintEncoder.js.map