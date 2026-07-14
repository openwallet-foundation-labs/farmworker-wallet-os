"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateAndroidChannelGroup;
const utils_1 = require("../utils");
function validateAndroidChannelGroup(group) {
    if (!(0, utils_1.isObject)(group)) {
        throw new Error("'group' expected an object value.");
    }
    /**
     * id
     */
    if (!(0, utils_1.isString)(group.id) || !group.id) {
        throw new Error("'group.id' expected a string value.");
    }
    /**
     * name
     */
    if (!(0, utils_1.isString)(group.name) || !group.name) {
        throw new Error("'group.name' expected a string value.");
    }
    /**
     * Defaults
     */
    const out = {
        id: group.id,
        name: group.name,
    };
    /**
     * description
     */
    if ((0, utils_1.objectHasProperty)(group, 'description')) {
        if (!(0, utils_1.isString)(group.description)) {
            throw new Error("'group.description' expected a string value.");
        }
        out.description = group.description;
    }
    return out;
}
//# sourceMappingURL=validateAndroidChannelGroup.js.map