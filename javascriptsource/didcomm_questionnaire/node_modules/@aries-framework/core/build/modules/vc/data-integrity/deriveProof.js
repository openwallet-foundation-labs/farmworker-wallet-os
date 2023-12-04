"use strict";
/*
 * Copyright 2020 - MATTR Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveProof = void 0;
const utils_1 = require("../../../utils");
const constants_1 = require("../constants");
const jsonldUtil_1 = require("./jsonldUtil");
const jsonld_1 = __importDefault(require("./libraries/jsonld"));
const W3cJsonLdVerifiableCredential_1 = require("./models/W3cJsonLdVerifiableCredential");
/**
 * Derives a proof from a document featuring a supported linked data proof
 *
 * NOTE - This is a temporary API extending JSON-LD signatures
 *
 * @param proofDocument A document featuring a linked data proof capable of proof derivation
 * @param revealDocument A document of the form of a JSON-LD frame describing the terms to selectively derive from the proof document
 * @param options Options for proof derivation
 */
const deriveProof = async (proofDocument, revealDocument, { suite, skipProofCompaction, documentLoader, expansionMap, nonce }) => {
    var _a;
    if (!suite) {
        throw new TypeError('"options.suite" is required.');
    }
    if (Array.isArray(proofDocument)) {
        throw new TypeError('proofDocument should be an object not an array.');
    }
    const { proofs, document } = await (0, jsonldUtil_1.getProofs)({
        document: proofDocument,
        proofType: suite.supportedDeriveProofType,
        documentLoader,
        expansionMap,
    });
    if (proofs.length === 0) {
        throw new Error(`There were not any proofs provided that can be used to derive a proof with this suite.`);
    }
    let derivedProof = await suite.deriveProof({
        document,
        proof: proofs[0],
        revealDocument,
        documentLoader,
        expansionMap,
        nonce,
    });
    if (proofs.length > 1) {
        // convert the proof property value from object ot array of objects
        derivedProof = Object.assign(Object.assign({}, derivedProof), { proof: [derivedProof.proof] });
        // drop the first proof because it's already been processed
        proofs.splice(0, 1);
        // add all the additional proofs to the derivedProof document
        for (const proof of proofs) {
            const additionalDerivedProofValue = await suite.deriveProof({
                document,
                proof,
                revealDocument,
                documentLoader,
                expansionMap,
            });
            derivedProof.proof.push(additionalDerivedProofValue.proof);
        }
    }
    if (!skipProofCompaction) {
        /* eslint-disable prefer-const */
        let expandedProof = {
            [constants_1.SECURITY_PROOF_URL]: {
                '@graph': derivedProof.proof,
            },
        };
        // account for type-scoped `proof` definition by getting document types
        const { types, alias } = await (0, jsonldUtil_1.getTypeInfo)(derivedProof.document, {
            documentLoader,
            expansionMap,
        });
        expandedProof['@type'] = types;
        const ctx = jsonld_1.default.getValues(derivedProof.document, '@context');
        const compactProof = await jsonld_1.default.compact(expandedProof, ctx, {
            documentLoader,
            expansionMap,
            compactToRelative: false,
        });
        delete compactProof[alias];
        delete compactProof['@context'];
        /**
         * removes the @included tag when multiple proofs exist because the
         * @included tag messes up the canonicalized bytes leading to a bad
         * signature that won't verify.
         **/
        if ((_a = compactProof.proof) === null || _a === void 0 ? void 0 : _a['@included']) {
            compactProof.proof = compactProof.proof['@included'];
        }
        // add proof to document
        const key = Object.keys(compactProof)[0];
        jsonld_1.default.addValue(derivedProof.document, key, compactProof[key]);
    }
    else {
        delete derivedProof.proof['@context'];
        jsonld_1.default.addValue(derivedProof.document, 'proof', derivedProof.proof);
    }
    return utils_1.JsonTransformer.fromJSON(derivedProof.document, W3cJsonLdVerifiableCredential_1.W3cJsonLdVerifiableCredential);
};
exports.deriveProof = deriveProof;
//# sourceMappingURL=deriveProof.js.map