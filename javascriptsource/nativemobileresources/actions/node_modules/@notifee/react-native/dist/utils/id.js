"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
function generateId() {
    let newId = '';
    for (let i = 0; i < 20; i++) {
        newId += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }
    return newId;
}
//# sourceMappingURL=id.js.map