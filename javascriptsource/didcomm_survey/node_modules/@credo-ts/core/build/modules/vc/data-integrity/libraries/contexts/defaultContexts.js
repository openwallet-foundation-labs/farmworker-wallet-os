"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONTEXTS = void 0;
const X25519_v1_1 = require("./X25519_v1");
const bbs_v1_1 = require("./bbs_v1");
const credentials_v1_1 = require("./credentials_v1");
const dataIntegrity_v2_1 = require("./dataIntegrity_v2");
const did_v1_1 = require("./did_v1");
const ed25519_v1_1 = require("./ed25519_v1");
const odrl_1 = require("./odrl");
const purl_ob_v3po_1 = require("./purl_ob_v3po");
const schema_org_1 = require("./schema_org");
const secp256k1_v1_1 = require("./secp256k1_v1");
const security_v1_1 = require("./security_v1");
const security_v2_1 = require("./security_v2");
const submission_1 = require("./submission");
const vc_revocation_list_2020_1 = require("./vc_revocation_list_2020");
exports.DEFAULT_CONTEXTS = {
    'https://w3id.org/security/suites/bls12381-2020/v1': bbs_v1_1.BBS_V1,
    'https://w3id.org/security/bbs/v1': bbs_v1_1.BBS_V1,
    'https://w3id.org/security/v1': security_v1_1.SECURITY_V1,
    'https://w3id.org/security/v2': security_v2_1.SECURITY_V2,
    'https://w3id.org/security/suites/x25519-2019/v1': X25519_v1_1.X25519_V1,
    'https://w3id.org/security/suites/ed25519-2018/v1': ed25519_v1_1.ED25519_V1,
    'https://w3id.org/security/suites/secp256k1-2019/v1': secp256k1_v1_1.SECP256K1_V1,
    'https://www.w3.org/2018/credentials/v1': credentials_v1_1.CREDENTIALS_V1,
    'https://w3id.org/did/v1': did_v1_1.DID_V1,
    'https://www.w3.org/ns/did/v1': did_v1_1.DID_V1,
    'https://w3.org/ns/did/v1': did_v1_1.DID_V1,
    'https://www.w3.org/ns/odrl.jsonld': odrl_1.ODRL,
    'http://schema.org/': schema_org_1.SCHEMA_ORG,
    'https://identity.foundation/presentation-exchange/submission/v1': submission_1.PRESENTATION_SUBMISSION,
    'https://purl.imsglobal.org/spec/ob/v3p0/context.json': purl_ob_v3po_1.PURL_OB_V3P0,
    'https://w3c-ccg.github.io/vc-status-rl-2020/contexts/vc-revocation-list-2020/v1.jsonld': vc_revocation_list_2020_1.VC_REVOCATION_LIST_2020,
    'https://w3id.org/security/data-integrity/v2': dataIntegrity_v2_1.DATA_INTEGRITY_V2,
};
//# sourceMappingURL=defaultContexts.js.map