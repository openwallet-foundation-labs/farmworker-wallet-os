"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialFormatCoordinator = void 0;
const CredoError_1 = require("../../../../error/CredoError");
const didcomm_1 = require("../../../../storage/didcomm");
const messages_1 = require("./messages");
class CredentialFormatCoordinator {
    /**
     * Create a {@link V2ProposeCredentialMessage}.
     *
     * @param options
     * @returns The created {@link V2ProposeCredentialMessage}
     *
     */
    async createProposal(agentContext, { credentialFormats, formatServices, credentialRecord, comment, goalCode, goal, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const proposalAttachments = [];
        let credentialPreview;
        for (const formatService of formatServices) {
            const { format, attachment, previewAttributes } = await formatService.createProposal(agentContext, {
                credentialFormats,
                credentialRecord,
            });
            if (previewAttributes) {
                credentialPreview = new messages_1.V2CredentialPreview({
                    attributes: previewAttributes,
                });
            }
            proposalAttachments.push(attachment);
            formats.push(format);
        }
        credentialRecord.credentialAttributes = credentialPreview === null || credentialPreview === void 0 ? void 0 : credentialPreview.attributes;
        const message = new messages_1.V2ProposeCredentialMessage({
            id: credentialRecord.threadId,
            formats,
            proposalAttachments,
            comment,
            credentialPreview,
            goalCode,
            goal,
        });
        message.setThread({ threadId: credentialRecord.threadId, parentThreadId: credentialRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Sender,
            associatedRecordId: credentialRecord.id,
        });
        return message;
    }
    async processProposal(agentContext, { credentialRecord, message, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        for (const formatService of formatServices) {
            const attachment = this.getAttachmentForService(formatService, message.formats, message.proposalAttachments);
            await formatService.processProposal(agentContext, {
                attachment,
                credentialRecord,
            });
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Receiver,
            associatedRecordId: credentialRecord.id,
        });
    }
    async acceptProposal(agentContext, { credentialRecord, credentialFormats, formatServices, comment, goalCode, goal, }) {
        var _a;
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const offerAttachments = [];
        let credentialPreview;
        const proposalMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2ProposeCredentialMessage,
            role: didcomm_1.DidCommMessageRole.Receiver,
        });
        // NOTE: We set the credential attributes from the proposal on the record as we've 'accepted' them
        // and can now use them to create the offer in the format services. It may be overwritten later on
        // if the user provided other attributes in the credentialFormats array.
        credentialRecord.credentialAttributes = (_a = proposalMessage.credentialPreview) === null || _a === void 0 ? void 0 : _a.attributes;
        for (const formatService of formatServices) {
            const proposalAttachment = this.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments);
            const { attachment, format, previewAttributes } = await formatService.acceptProposal(agentContext, {
                credentialRecord,
                credentialFormats,
                proposalAttachment,
            });
            if (previewAttributes) {
                credentialPreview = new messages_1.V2CredentialPreview({
                    attributes: previewAttributes,
                });
            }
            offerAttachments.push(attachment);
            formats.push(format);
        }
        credentialRecord.credentialAttributes = credentialPreview === null || credentialPreview === void 0 ? void 0 : credentialPreview.attributes;
        if (!credentialPreview) {
            // If no preview attributes were provided, use a blank preview. Not all formats use this object
            // but it is required by the protocol
            credentialPreview = new messages_1.V2CredentialPreview({
                attributes: [],
            });
        }
        const message = new messages_1.V2OfferCredentialMessage({
            formats,
            credentialPreview,
            offerAttachments,
            comment,
            goalCode,
            goal,
        });
        message.setThread({ threadId: credentialRecord.threadId, parentThreadId: credentialRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            associatedRecordId: credentialRecord.id,
            role: didcomm_1.DidCommMessageRole.Sender,
        });
        return message;
    }
    /**
     * Create a {@link V2OfferCredentialMessage}.
     *
     * @param options
     * @returns The created {@link V2OfferCredentialMessage}
     *
     */
    async createOffer(agentContext, { credentialFormats, formatServices, credentialRecord, comment, goalCode, goal, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const offerAttachments = [];
        let credentialPreview;
        for (const formatService of formatServices) {
            const { format, attachment, previewAttributes } = await formatService.createOffer(agentContext, {
                credentialFormats,
                credentialRecord,
            });
            if (previewAttributes) {
                credentialPreview = new messages_1.V2CredentialPreview({
                    attributes: previewAttributes,
                });
            }
            offerAttachments.push(attachment);
            formats.push(format);
        }
        credentialRecord.credentialAttributes = credentialPreview === null || credentialPreview === void 0 ? void 0 : credentialPreview.attributes;
        if (!credentialPreview) {
            // If no preview attributes were provided, use a blank preview. Not all formats use this object
            // but it is required by the protocol
            credentialPreview = new messages_1.V2CredentialPreview({
                attributes: [],
            });
        }
        const message = new messages_1.V2OfferCredentialMessage({
            formats,
            comment,
            goalCode,
            goal,
            offerAttachments,
            credentialPreview,
        });
        message.setThread({ threadId: credentialRecord.threadId, parentThreadId: credentialRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Sender,
            associatedRecordId: credentialRecord.id,
        });
        return message;
    }
    async processOffer(agentContext, { credentialRecord, message, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        for (const formatService of formatServices) {
            const attachment = this.getAttachmentForService(formatService, message.formats, message.offerAttachments);
            await formatService.processOffer(agentContext, {
                attachment,
                credentialRecord,
            });
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Receiver,
            associatedRecordId: credentialRecord.id,
        });
    }
    async acceptOffer(agentContext, { credentialRecord, credentialFormats, formatServices, comment, goalCode, goal, }) {
        var _a;
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        const offerMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2OfferCredentialMessage,
            role: didcomm_1.DidCommMessageRole.Receiver,
        });
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const requestAttachments = [];
        const requestAppendAttachments = [];
        for (const formatService of formatServices) {
            const offerAttachment = this.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments);
            const { attachment, format, appendAttachments } = await formatService.acceptOffer(agentContext, {
                offerAttachment,
                credentialRecord,
                credentialFormats,
            });
            requestAttachments.push(attachment);
            formats.push(format);
            if (appendAttachments)
                requestAppendAttachments.push(...appendAttachments);
        }
        credentialRecord.credentialAttributes = (_a = offerMessage.credentialPreview) === null || _a === void 0 ? void 0 : _a.attributes;
        const message = new messages_1.V2RequestCredentialMessage({
            formats,
            attachments: requestAppendAttachments,
            requestAttachments: requestAttachments,
            comment,
            goalCode,
            goal,
        });
        message.setThread({ threadId: credentialRecord.threadId, parentThreadId: credentialRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            associatedRecordId: credentialRecord.id,
            role: didcomm_1.DidCommMessageRole.Sender,
        });
        return message;
    }
    /**
     * Create a {@link V2RequestCredentialMessage}.
     *
     * @param options
     * @returns The created {@link V2RequestCredentialMessage}
     *
     */
    async createRequest(agentContext, { credentialFormats, formatServices, credentialRecord, comment, goalCode, goal, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const requestAttachments = [];
        for (const formatService of formatServices) {
            const { format, attachment } = await formatService.createRequest(agentContext, {
                credentialFormats,
                credentialRecord,
            });
            requestAttachments.push(attachment);
            formats.push(format);
        }
        const message = new messages_1.V2RequestCredentialMessage({
            formats,
            comment,
            goalCode,
            goal,
            requestAttachments: requestAttachments,
        });
        message.setThread({ threadId: credentialRecord.threadId, parentThreadId: credentialRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Sender,
            associatedRecordId: credentialRecord.id,
        });
        return message;
    }
    async processRequest(agentContext, { credentialRecord, message, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        for (const formatService of formatServices) {
            const attachment = this.getAttachmentForService(formatService, message.formats, message.requestAttachments);
            await formatService.processRequest(agentContext, {
                attachment,
                credentialRecord,
            });
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Receiver,
            associatedRecordId: credentialRecord.id,
        });
    }
    async acceptRequest(agentContext, { credentialRecord, credentialFormats, formatServices, comment, goalCode, goal, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        const requestMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2RequestCredentialMessage,
            role: didcomm_1.DidCommMessageRole.Receiver,
        });
        const offerMessage = await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2OfferCredentialMessage,
            role: didcomm_1.DidCommMessageRole.Sender,
        });
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const credentialAttachments = [];
        for (const formatService of formatServices) {
            const requestAttachment = this.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const offerAttachment = offerMessage
                ? this.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments)
                : undefined;
            const { attachment, format } = await formatService.acceptRequest(agentContext, {
                requestAttachment,
                offerAttachment,
                credentialRecord,
                credentialFormats,
                requestAppendAttachments: requestMessage.appendedAttachments,
            });
            credentialAttachments.push(attachment);
            formats.push(format);
        }
        const message = new messages_1.V2IssueCredentialMessage({
            formats,
            credentialAttachments: credentialAttachments,
            comment,
            goalCode,
            goal,
        });
        message.setThread({ threadId: credentialRecord.threadId, parentThreadId: credentialRecord.parentThreadId });
        message.setPleaseAck();
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            associatedRecordId: credentialRecord.id,
            role: didcomm_1.DidCommMessageRole.Sender,
        });
        return message;
    }
    async processCredential(agentContext, { credentialRecord, message, requestMessage, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
        const offerMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2OfferCredentialMessage,
            role: didcomm_1.DidCommMessageRole.Receiver,
        });
        for (const formatService of formatServices) {
            const offerAttachment = this.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments);
            const attachment = this.getAttachmentForService(formatService, message.formats, message.credentialAttachments);
            const requestAttachment = this.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            await formatService.processCredential(agentContext, {
                attachment,
                offerAttachment,
                requestAttachment,
                credentialRecord,
                requestAppendAttachments: requestMessage.appendedAttachments,
            });
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: didcomm_1.DidCommMessageRole.Receiver,
            associatedRecordId: credentialRecord.id,
        });
    }
    getAttachmentForService(credentialFormatService, formats, attachments) {
        const attachmentId = this.getAttachmentIdForService(credentialFormatService, formats);
        const attachment = attachments.find((attachment) => attachment.id === attachmentId);
        if (!attachment) {
            throw new CredoError_1.CredoError(`Attachment with id ${attachmentId} not found in attachments.`);
        }
        return attachment;
    }
    getAttachmentIdForService(credentialFormatService, formats) {
        const format = formats.find((format) => credentialFormatService.supportsFormat(format.format));
        if (!format)
            throw new CredoError_1.CredoError(`No attachment found for service ${credentialFormatService.formatKey}`);
        return format.attachmentId;
    }
}
exports.CredentialFormatCoordinator = CredentialFormatCoordinator;
//# sourceMappingURL=CredentialFormatCoordinator.js.map