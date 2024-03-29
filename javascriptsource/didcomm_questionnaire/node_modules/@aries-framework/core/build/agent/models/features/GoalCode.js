"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCode = void 0;
const Feature_1 = require("./Feature");
class GoalCode extends Feature_1.Feature {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { type: GoalCode.type }));
    }
}
exports.GoalCode = GoalCode;
GoalCode.type = 'goal-code';
//# sourceMappingURL=GoalCode.js.map