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
exports.DidRepository = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const constants_1 = require("../../../constants");
const plugins_1 = require("../../../plugins");
const Repository_1 = require("../../../storage/Repository");
const DidDocumentRole_1 = require("../domain/DidDocumentRole");
const DidRecord_1 = require("./DidRecord");
let DidRepository = class DidRepository extends Repository_1.Repository {
    constructor(storageService, eventEmitter) {
        super(DidRecord_1.DidRecord, storageService, eventEmitter);
    }
    /**
     * Finds a {@link DidRecord}, containing the specified recipientKey that was received by this agent.
     * To find a {@link DidRecord} that was created by this agent, use {@link DidRepository.findCreatedDidByRecipientKey}.
     */
    findReceivedDidByRecipientKey(agentContext, recipientKey) {
        return this.findSingleByQuery(agentContext, {
            recipientKeyFingerprints: [recipientKey.fingerprint],
            role: DidDocumentRole_1.DidDocumentRole.Received,
        });
    }
    /**
     * Finds a {@link DidRecord}, containing the specified recipientKey that was created by this agent.
     * To find a {@link DidRecord} that was received by this agent, use {@link DidRepository.findReceivedDidByRecipientKey}.
     */
    findCreatedDidByRecipientKey(agentContext, recipientKey) {
        return this.findSingleByQuery(agentContext, {
            recipientKeyFingerprints: [recipientKey.fingerprint],
            role: DidDocumentRole_1.DidDocumentRole.Created,
        });
    }
    findAllByRecipientKey(agentContext, recipientKey) {
        return this.findByQuery(agentContext, { recipientKeyFingerprints: [recipientKey.fingerprint] });
    }
    findAllByDid(agentContext, did) {
        return this.findByQuery(agentContext, { did });
    }
    findReceivedDid(agentContext, receivedDid) {
        return this.findSingleByQuery(agentContext, { did: receivedDid, role: DidDocumentRole_1.DidDocumentRole.Received });
    }
    findCreatedDid(agentContext, createdDid) {
        return this.findSingleByQuery(agentContext, { did: createdDid, role: DidDocumentRole_1.DidDocumentRole.Created });
    }
    getCreatedDids(agentContext, { method, did }) {
        return this.findByQuery(agentContext, {
            role: DidDocumentRole_1.DidDocumentRole.Created,
            method,
            did,
        });
    }
    async storeCreatedDid(agentContext, { did, didDocument, tags }) {
        const didRecord = new DidRecord_1.DidRecord({
            did,
            didDocument,
            role: DidDocumentRole_1.DidDocumentRole.Created,
            tags,
        });
        await this.save(agentContext, didRecord);
        return didRecord;
    }
    async storeReceivedDid(agentContext, { did, didDocument, tags }) {
        const didRecord = new DidRecord_1.DidRecord({
            did,
            didDocument,
            role: DidDocumentRole_1.DidDocumentRole.Received,
            tags,
        });
        await this.save(agentContext, didRecord);
        return didRecord;
    }
};
DidRepository = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.StorageService)),
    __metadata("design:paramtypes", [Object, EventEmitter_1.EventEmitter])
], DidRepository);
exports.DidRepository = DidRepository;
//# sourceMappingURL=DidRepository.js.map