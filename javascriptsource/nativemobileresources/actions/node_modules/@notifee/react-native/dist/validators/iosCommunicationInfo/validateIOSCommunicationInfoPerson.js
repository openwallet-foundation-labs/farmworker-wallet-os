"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateIOSCommunicationInfoPerson;
const utils_1 = require("../../utils");
function validateIOSCommunicationInfoPerson(person) {
    if (!(0, utils_1.isObject)(person)) {
        throw new Error("'person' expected an object.");
    }
    if (!(0, utils_1.isString)(person.id) || person.id.length === 0) {
        throw new Error('"person.id" expected a valid string value.');
    }
    if (!(0, utils_1.isString)(person.displayName) || person.displayName.length === 0) {
        throw new Error('"person.displayName" expected a valid string value.');
    }
    const out = {
        id: person.id,
        displayName: person.displayName,
    };
    if ((0, utils_1.objectHasProperty)(person, 'avatar') && !(0, utils_1.isUndefined)(person.avatar)) {
        if (!(0, utils_1.isString)(person.avatar)) {
            throw new Error('"person.avatar" expected a valid object value.');
        }
        out.avatar = person.avatar;
    }
    return out;
}
//# sourceMappingURL=validateIOSCommunicationInfoPerson.js.map