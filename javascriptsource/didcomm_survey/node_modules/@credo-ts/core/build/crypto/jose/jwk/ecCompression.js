"use strict";
/**
 * Based on https://github.com/transmute-industries/verifiable-data/blob/main/packages/web-crypto-key-pair/src/compression/ec-compression.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expand = exports.compress = void 0;
// native BigInteger is only supported in React Native 0.70+, so we use big-integer for now.
const big_integer_1 = __importDefault(require("big-integer"));
const buffer_1 = require("../../../utils/buffer");
const jwa_1 = require("../jwa");
const curveToPointLength = {
    [jwa_1.JwaCurve.P256]: 64,
    [jwa_1.JwaCurve.P384]: 96,
    [jwa_1.JwaCurve.P521]: 132,
    [jwa_1.JwaCurve.Secp256k1]: 64,
};
function getConstantsForCurve(curve) {
    let two, prime, b, pIdent;
    if (curve === 'P-256') {
        two = (0, big_integer_1.default)(2);
        prime = two.pow(256).subtract(two.pow(224)).add(two.pow(192)).add(two.pow(96)).subtract(1);
        pIdent = prime.add(1).divide(4);
        b = (0, big_integer_1.default)('5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b', 16);
    }
    if (curve === 'P-384') {
        two = (0, big_integer_1.default)(2);
        prime = two.pow(384).subtract(two.pow(128)).subtract(two.pow(96)).add(two.pow(32)).subtract(1);
        pIdent = prime.add(1).divide(4);
        b = (0, big_integer_1.default)('b3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef', 16);
    }
    if (curve === 'P-521') {
        two = (0, big_integer_1.default)(2);
        prime = two.pow(521).subtract(1);
        b = (0, big_integer_1.default)('00000051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00', 16);
        pIdent = prime.add(1).divide(4);
    }
    // https://en.bitcoin.it/wiki/Secp256k1
    // p = FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE FFFFFC2F
    // P = 2256 - 232 - 29 - 28 - 27 - 26 - 24 - 1
    if (curve === jwa_1.JwaCurve.Secp256k1) {
        two = (0, big_integer_1.default)(2);
        prime = two
            .pow(256)
            .subtract(two.pow(32))
            .subtract(two.pow(9))
            .subtract(two.pow(8))
            .subtract(two.pow(7))
            .subtract(two.pow(6))
            .subtract(two.pow(4))
            .subtract(1);
        b = (0, big_integer_1.default)(7);
        pIdent = prime.add(1).divide(4);
    }
    if (!prime || !b || !pIdent) {
        throw new Error(`Unsupported curve ${curve}`);
    }
    return { prime, b, pIdent };
}
// see https://stackoverflow.com/questions/17171542/algorithm-for-elliptic-curve-point-compression
// https://github.com/w3c-ccg/did-method-key/pull/36
/**
 * Point compress elliptic curve key
 * @return Compressed representation
 */
function compressECPoint(x, y) {
    const out = new Uint8Array(x.length + 1);
    out[0] = 2 + (y[y.length - 1] & 1);
    out.set(x, 1);
    return out;
}
function padWithZeroes(number, length) {
    let value = '' + number;
    while (value.length < length) {
        value = '0' + value;
    }
    return value;
}
function compress(publicKey) {
    const publicKeyHex = buffer_1.Buffer.from(publicKey).toString('hex');
    const xHex = publicKeyHex.slice(0, publicKeyHex.length / 2);
    const yHex = publicKeyHex.slice(publicKeyHex.length / 2, publicKeyHex.length);
    const xOctet = Uint8Array.from(buffer_1.Buffer.from(xHex, 'hex'));
    const yOctet = Uint8Array.from(buffer_1.Buffer.from(yHex, 'hex'));
    return compressECPoint(xOctet, yOctet);
}
exports.compress = compress;
function expand(publicKey, curve) {
    const publicKeyComponent = buffer_1.Buffer.from(publicKey).toString('hex');
    const { prime, b, pIdent } = getConstantsForCurve(curve);
    const signY = new Number(publicKeyComponent[1]).valueOf() - 2;
    const x = (0, big_integer_1.default)(publicKeyComponent.substring(2), 16);
    // y^2 = x^3 - 3x + b
    let y = x.pow(3).subtract(x.multiply(3)).add(b).modPow(pIdent, prime);
    if (curve === 'secp256k1') {
        // y^2 = x^3 + 7
        y = x.pow(3).add(7).modPow(pIdent, prime);
    }
    // If the parity doesn't match it's the *other* root
    if (y.mod(2).toJSNumber() !== signY) {
        // y = prime - y
        y = prime.subtract(y);
    }
    return buffer_1.Buffer.from(padWithZeroes(x.toString(16), curveToPointLength[curve]) + padWithZeroes(y.toString(16), curveToPointLength[curve]), 'hex');
}
exports.expand = expand;
//# sourceMappingURL=ecCompression.js.map