import type { AgentContext } from '../../../../agent';
import type { Attachment } from '../../../../decorators/attachment/Attachment';
import type { ExtractProofFormats, ProofFormatCredentialForRequestPayload, ProofFormatPayload, ProofFormatService } from '../../formats';
import type { ProofFormatSpec } from '../../models/ProofFormatSpec';
import type { ProofExchangeRecord } from '../../repository';
import { V2PresentationMessage, V2ProposePresentationMessage, V2RequestPresentationMessage } from './messages';
export declare class ProofFormatCoordinator<PFs extends ProofFormatService[]> {
    /**
     * Create a {@link V2ProposePresentationMessage}.
     *
     * @param options
     * @returns The created {@link V2ProposePresentationMessage}
     *
     */
    createProposal(agentContext: AgentContext, { proofFormats, formatServices, proofRecord, comment, goalCode, goal, }: {
        formatServices: ProofFormatService[];
        proofFormats: ProofFormatPayload<ExtractProofFormats<PFs>, 'createProposal'>;
        proofRecord: ProofExchangeRecord;
        comment?: string;
        goalCode?: string;
        goal?: string;
    }): Promise<V2ProposePresentationMessage>;
    processProposal(agentContext: AgentContext, { proofRecord, message, formatServices, }: {
        proofRecord: ProofExchangeRecord;
        message: V2ProposePresentationMessage;
        formatServices: ProofFormatService[];
    }): Promise<void>;
    acceptProposal(agentContext: AgentContext, { proofRecord, proofFormats, formatServices, comment, goalCode, goal, presentMultiple, willConfirm, }: {
        proofRecord: ProofExchangeRecord;
        proofFormats?: ProofFormatPayload<ExtractProofFormats<PFs>, 'acceptProposal'>;
        formatServices: ProofFormatService[];
        comment?: string;
        goalCode?: string;
        goal?: string;
        presentMultiple?: boolean;
        willConfirm?: boolean;
    }): Promise<V2RequestPresentationMessage>;
    /**
     * Create a {@link V2RequestPresentationMessage}.
     *
     * @param options
     * @returns The created {@link V2RequestPresentationMessage}
     *
     */
    createRequest(agentContext: AgentContext, { proofFormats, formatServices, proofRecord, comment, goalCode, goal, presentMultiple, willConfirm, }: {
        formatServices: ProofFormatService[];
        proofFormats: ProofFormatPayload<ExtractProofFormats<PFs>, 'createRequest'>;
        proofRecord: ProofExchangeRecord;
        comment?: string;
        goalCode?: string;
        goal?: string;
        presentMultiple?: boolean;
        willConfirm?: boolean;
    }): Promise<V2RequestPresentationMessage>;
    processRequest(agentContext: AgentContext, { proofRecord, message, formatServices, }: {
        proofRecord: ProofExchangeRecord;
        message: V2RequestPresentationMessage;
        formatServices: ProofFormatService[];
    }): Promise<void>;
    acceptRequest(agentContext: AgentContext, { proofRecord, proofFormats, formatServices, comment, lastPresentation, goalCode, goal, }: {
        proofRecord: ProofExchangeRecord;
        proofFormats?: ProofFormatPayload<ExtractProofFormats<PFs>, 'acceptRequest'>;
        formatServices: ProofFormatService[];
        comment?: string;
        lastPresentation?: boolean;
        goalCode?: string;
        goal?: string;
    }): Promise<V2PresentationMessage>;
    getCredentialsForRequest(agentContext: AgentContext, { proofRecord, proofFormats, formatServices, }: {
        proofRecord: ProofExchangeRecord;
        proofFormats?: ProofFormatCredentialForRequestPayload<ExtractProofFormats<PFs>, 'getCredentialsForRequest', 'input'>;
        formatServices: ProofFormatService[];
    }): Promise<ProofFormatCredentialForRequestPayload<ExtractProofFormats<PFs>, 'getCredentialsForRequest', 'output'>>;
    selectCredentialsForRequest(agentContext: AgentContext, { proofRecord, proofFormats, formatServices, }: {
        proofRecord: ProofExchangeRecord;
        proofFormats?: ProofFormatCredentialForRequestPayload<ExtractProofFormats<PFs>, 'selectCredentialsForRequest', 'input'>;
        formatServices: ProofFormatService[];
    }): Promise<ProofFormatCredentialForRequestPayload<ExtractProofFormats<PFs>, 'selectCredentialsForRequest', 'output'>>;
    processPresentation(agentContext: AgentContext, { proofRecord, message, requestMessage, formatServices, }: {
        proofRecord: ProofExchangeRecord;
        message: V2PresentationMessage;
        requestMessage: V2RequestPresentationMessage;
        formatServices: ProofFormatService[];
    }): Promise<{
        isValid: true;
        message: undefined;
    } | {
        isValid: false;
        message: string;
    }>;
    getAttachmentForService(credentialFormatService: ProofFormatService, formats: ProofFormatSpec[], attachments: Attachment[]): Attachment;
    private getAttachmentIdForService;
}
