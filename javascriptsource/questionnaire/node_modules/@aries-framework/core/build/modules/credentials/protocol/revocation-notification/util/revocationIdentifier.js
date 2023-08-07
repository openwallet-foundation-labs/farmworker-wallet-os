"use strict";
// indyRevocationIdentifier = <revocation_registry_id>::<credential_revocation_id>
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2IndyRevocationFormat = exports.v2IndyRevocationIdentifierRegex = exports.v1ThreadRegex = void 0;
// ThreadID = indy::<revocation_registry_id>::<credential_revocation_id>
exports.v1ThreadRegex = /(indy)::((?:[\dA-z]{21,22}):4:(?:[\dA-z]{21,22}):3:[Cc][Ll]:(?:(?:[1-9][0-9]*)|(?:[\dA-z]{21,22}:2:.+:[0-9.]+)):.+?:CL_ACCUM:(?:[\dA-z-]+))::(\d+)$/;
// CredentialID = <revocation_registry_id>::<credential_revocation_id>
exports.v2IndyRevocationIdentifierRegex = /((?:[\dA-z]{21,22}):4:(?:[\dA-z]{21,22}):3:[Cc][Ll]:(?:(?:[1-9][0-9]*)|(?:[\dA-z]{21,22}:2:.+:[0-9.]+)):.+?:CL_ACCUM:(?:[\dA-z-]+))::(\d+)$/;
exports.v2IndyRevocationFormat = 'indy-anoncreds';
//# sourceMappingURL=revocationIdentifier.js.map