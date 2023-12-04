"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cCredentialRepository = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const constants_1 = require("../../../constants");
const plugins_1 = require("../../../plugins");
const Repository_1 = require("../../../storage/Repository");
const W3cCredentialRecord_1 = require("./W3cCredentialRecord");
let W3cCredentialRepository = class W3cCredentialRepository extends Repository_1.Repository {
    constructor(storageService, eventEmitter) {
        super(W3cCredentialRecord_1.W3cCredentialRecord, storageService, eventEmitter);
    }
};
W3cCredentialRepository = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.StorageService)),
    __metadata("design:paramtypes", [Object, EventEmitter_1.EventEmitter])
], W3cCredentialRepository);
exports.W3cCredentialRepository = W3cCredentialRepository;
//# sourceMappingURL=W3cCredentialRepository.js.map