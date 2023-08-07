"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofFormatCoordinator = void 0;
const error_1 = require("../../../../error");
const storage_1 = require("../../../../storage");
const messages_1 = require("./messages");
class ProofFormatCoordinator {
    /**
     * Create a {@link V2ProposePresentationMessage}.
     *
     * @param options
     * @returns The created {@link V2ProposePresentationMessage}
     *
     */
    async createProposal(agentContext, { proofFormats, formatServices, proofRecord, comment, goalCode, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const proposalAttachments = [];
        for (const formatService of formatServices) {
            const { format, attachment } = await formatService.createProposal(agentContext, {
                proofFormats,
                proofRecord,
            });
            proposalAttachments.push(attachment);
            formats.push(format);
        }
        const message = new messages_1.V2ProposePresentationMessage({
            id: proofRecord.threadId,
            formats,
            proposalAttachments,
            comment: comment,
            goalCode,
        });
        message.setThread({ threadId: proofRecord.threadId, parentThreadId: proofRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: storage_1.DidCommMessageRole.Sender,
            associatedRecordId: proofRecord.id,
        });
        return message;
    }
    async processProposal(agentContext, { proofRecord, message, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        for (const formatService of formatServices) {
            const attachment = this.getAttachmentForService(formatService, message.formats, message.proposalAttachments);
            await formatService.processProposal(agentContext, {
                attachment,
                proofRecord,
            });
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: storage_1.DidCommMessageRole.Receiver,
            associatedRecordId: proofRecord.id,
        });
    }
    async acceptProposal(agentContext, { proofRecord, proofFormats, formatServices, comment, goalCode, presentMultiple, willConfirm, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const requestAttachments = [];
        const proposalMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2ProposePresentationMessage,
        });
        for (const formatService of formatServices) {
            const proposalAttachment = this.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments);
            const { attachment, format } = await formatService.acceptProposal(agentContext, {
                proofRecord,
                proofFormats,
                proposalAttachment,
            });
            requestAttachments.push(attachment);
            formats.push(format);
        }
        const message = new messages_1.V2RequestPresentationMessage({
            formats,
            requestAttachments,
            comment,
            goalCode,
            presentMultiple,
            willConfirm,
        });
        message.setThread({ threadId: proofRecord.threadId, parentThreadId: proofRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            associatedRecordId: proofRecord.id,
            role: storage_1.DidCommMessageRole.Sender,
        });
        return message;
    }
    /**
     * Create a {@link V2RequestPresentationMessage}.
     *
     * @param options
     * @returns The created {@link V2RequestPresentationMessage}
     *
     */
    async createRequest(agentContext, { proofFormats, formatServices, proofRecord, comment, goalCode, presentMultiple, willConfirm, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const requestAttachments = [];
        for (const formatService of formatServices) {
            const { format, attachment } = await formatService.createRequest(agentContext, {
                proofFormats,
                proofRecord,
            });
            requestAttachments.push(attachment);
            formats.push(format);
        }
        const message = new messages_1.V2RequestPresentationMessage({
            formats,
            comment,
            requestAttachments,
            goalCode,
            presentMultiple,
            willConfirm,
        });
        message.setThread({ threadId: proofRecord.threadId, parentThreadId: proofRecord.parentThreadId });
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: storage_1.DidCommMessageRole.Sender,
            associatedRecordId: proofRecord.id,
        });
        return message;
    }
    async processRequest(agentContext, { proofRecord, message, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        for (const formatService of formatServices) {
            const attachment = this.getAttachmentForService(formatService, message.formats, message.requestAttachments);
            await formatService.processRequest(agentContext, {
                attachment,
                proofRecord,
            });
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: storage_1.DidCommMessageRole.Receiver,
            associatedRecordId: proofRecord.id,
        });
    }
    async acceptRequest(agentContext, { proofRecord, proofFormats, formatServices, comment, lastPresentation, goalCode, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const requestMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2RequestPresentationMessage,
        });
        const proposalMessage = await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2ProposePresentationMessage,
        });
        // create message. there are two arrays in each message, one for formats the other for attachments
        const formats = [];
        const presentationAttachments = [];
        for (const formatService of formatServices) {
            const requestAttachment = this.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const proposalAttachment = proposalMessage
                ? this.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments)
                : undefined;
            const { attachment, format } = await formatService.acceptRequest(agentContext, {
                requestAttachment,
                proposalAttachment,
                proofRecord,
                proofFormats,
            });
            presentationAttachments.push(attachment);
            formats.push(format);
        }
        const message = new messages_1.V2PresentationMessage({
            formats,
            presentationAttachments,
            comment,
            lastPresentation,
            goalCode,
        });
        message.setThread({ threadId: proofRecord.threadId });
        message.setPleaseAck();
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            associatedRecordId: proofRecord.id,
            role: storage_1.DidCommMessageRole.Sender,
        });
        return message;
    }
    async getCredentialsForRequest(agentContext, { proofRecord, proofFormats, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const requestMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2RequestPresentationMessage,
        });
        const proposalMessage = await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2ProposePresentationMessage,
        });
        const credentialsForRequest = {};
        for (const formatService of formatServices) {
            const requestAttachment = this.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const proposalAttachment = proposalMessage
                ? this.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments)
                : undefined;
            const credentialsForFormat = await formatService.getCredentialsForRequest(agentContext, {
                requestAttachment,
                proposalAttachment,
                proofRecord,
                proofFormats,
            });
            credentialsForRequest[formatService.formatKey] = credentialsForFormat;
        }
        return credentialsForRequest;
    }
    async selectCredentialsForRequest(agentContext, { proofRecord, proofFormats, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const requestMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2RequestPresentationMessage,
        });
        const proposalMessage = await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2ProposePresentationMessage,
        });
        const credentialsForRequest = {};
        for (const formatService of formatServices) {
            const requestAttachment = this.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const proposalAttachment = proposalMessage
                ? this.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments)
                : undefined;
            const credentialsForFormat = await formatService.selectCredentialsForRequest(agentContext, {
                requestAttachment,
                proposalAttachment,
                proofRecord,
                proofFormats,
            });
            credentialsForRequest[formatService.formatKey] = credentialsForFormat;
        }
        return credentialsForRequest;
    }
    async processPresentation(agentContext, { proofRecord, message, requestMessage, formatServices, }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const formatVerificationResults = [];
        for (const formatService of formatServices) {
            const attachment = this.getAttachmentForService(formatService, message.formats, message.presentationAttachments);
            const requestAttachment = this.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const isValid = await formatService.processPresentation(agentContext, {
                attachment,
                requestAttachment,
                proofRecord,
            });
            formatVerificationResults.push(isValid);
        }
        await didCommMessageRepository.saveOrUpdateAgentMessage(agentContext, {
            agentMessage: message,
            role: storage_1.DidCommMessageRole.Receiver,
            associatedRecordId: proofRecord.id,
        });
        return formatVerificationResults.every((isValid) => isValid === true);
    }
    getAttachmentForService(credentialFormatService, formats, attachments) {
        const attachmentId = this.getAttachmentIdForService(credentialFormatService, formats);
        const attachment = attachments.find((attachment) => attachment.id === attachmentId);
        if (!attachment) {
            throw new error_1.AriesFrameworkError(`Attachment with id ${attachmentId} not found in attachments.`);
        }
        return attachment;
    }
    getAttachmentIdForService(credentialFormatService, formats) {
        const format = formats.find((format) => credentialFormatService.supportsFormat(format.format));
        if (!format)
            throw new error_1.AriesFrameworkError(`No attachment found for service ${credentialFormatService.formatKey}`);
        return format.attachmentId;
    }
}
exports.ProofFormatCoordinator = ProofFormatCoordinator;
//# sourceMappingURL=ProofFormatCoordinator.js.map