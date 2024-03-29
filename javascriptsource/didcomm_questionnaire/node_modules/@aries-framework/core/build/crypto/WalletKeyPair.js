"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletKeyPairClass = void 0;
const dids_1 = require("../modules/dids");
const keyDidMapping_1 = require("../modules/dids/domain/key-type/keyDidMapping");
const LdKeyPair_1 = require("../modules/vc/data-integrity/models/LdKeyPair");
const utils_1 = require("../utils");
const MessageValidator_1 = require("../utils/MessageValidator");
const buffer_1 = require("../utils/buffer");
function createWalletKeyPairClass(wallet) {
    return class WalletKeyPair extends LdKeyPair_1.LdKeyPair {
        constructor(options) {
            super(options);
            this.wallet = options.wallet;
            this.key = options.key;
            this.type = options.key.keyType;
        }
        static async generate() {
            throw new Error('Not implemented');
        }
        fingerprint() {
            throw new Error('Method not implemented.');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        verifyFingerprint(fingerprint) {
            throw new Error('Method not implemented.');
        }
        static async from(verificationMethod) {
            const vMethod = utils_1.JsonTransformer.fromJSON(verificationMethod, dids_1.VerificationMethod);
            MessageValidator_1.MessageValidator.validateSync(vMethod);
            const key = (0, keyDidMapping_1.getKeyFromVerificationMethod)(vMethod);
            return new WalletKeyPair({
                id: vMethod.id,
                controller: vMethod.controller,
                wallet: wallet,
                key: key,
            });
        }
        /**
         * This method returns a wrapped wallet.sign method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        signer() {
            // wrap function for conversion
            const wrappedSign = async (data) => {
                let converted = [];
                // convert uint8array to buffer
                if (Array.isArray(data.data)) {
                    converted = data.data.map((d) => buffer_1.Buffer.from(d));
                }
                else {
                    converted = buffer_1.Buffer.from(data.data);
                }
                // sign
                const result = await wallet.sign({
                    data: converted,
                    key: this.key,
                });
                // convert result buffer to uint8array
                return Uint8Array.from(result);
            };
            return {
                sign: wrappedSign.bind(this),
            };
        }
        /**
         * This method returns a wrapped wallet.verify method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        verifier() {
            const wrappedVerify = async (data) => {
                let converted = [];
                // convert uint8array to buffer
                if (Array.isArray(data.data)) {
                    converted = data.data.map((d) => buffer_1.Buffer.from(d));
                }
                else {
                    converted = buffer_1.Buffer.from(data.data);
                }
                // verify
                return wallet.verify({
                    data: converted,
                    signature: buffer_1.Buffer.from(data.signature),
                    key: this.key,
                });
            };
            return {
                verify: wrappedVerify.bind(this),
            };
        }
        get publicKeyBuffer() {
            return new Uint8Array(this.key.publicKey);
        }
    };
}
exports.createWalletKeyPairClass = createWalletKeyPairClass;
//# sourceMappingURL=WalletKeyPair.js.map