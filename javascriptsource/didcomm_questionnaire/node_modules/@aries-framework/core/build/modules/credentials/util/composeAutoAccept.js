"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeAutoAccept = void 0;
const CredentialAutoAcceptType_1 = require("../models/CredentialAutoAcceptType");
/**
 * Returns the credential auto accept config based on priority:
 *	- The record config takes first priority
 *	- Otherwise the agent config
 *	- Otherwise {@link AutoAcceptCredential.Never} is returned
 */
function composeAutoAccept(recordConfig, agentConfig) {
    var _a;
    return (_a = recordConfig !== null && recordConfig !== void 0 ? recordConfig : agentConfig) !== null && _a !== void 0 ? _a : CredentialAutoAcceptType_1.AutoAcceptCredential.Never;
}
exports.composeAutoAccept = composeAutoAccept;
//# sourceMappingURL=composeAutoAccept.js.map