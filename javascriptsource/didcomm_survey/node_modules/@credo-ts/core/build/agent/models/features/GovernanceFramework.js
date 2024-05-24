"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernanceFramework = void 0;
const Feature_1 = require("./Feature");
class GovernanceFramework extends Feature_1.Feature {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { type: GovernanceFramework.type }));
    }
}
exports.GovernanceFramework = GovernanceFramework;
GovernanceFramework.type = 'gov-fw';
//# sourceMappingURL=GovernanceFramework.js.map