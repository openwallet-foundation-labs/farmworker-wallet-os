import type { AgentContext } from '../../../../agent';
import type { Attachment } from '../../../../decorators/attachment/Attachment';
import type { CredentialFormatPayload, CredentialFormatService, ExtractCredentialFormats } from '../../formats';
import type { CredentialFormatSpec } from '../../models';
import type { CredentialExchangeRecord } from '../../repository/CredentialExchangeRecord';
import { V2IssueCredentialMessage, V2OfferCredentialMessage, V2ProposeCredentialMessage, V2RequestCredentialMessage } from './messages';
export declare class CredentialFormatCoordinator<CFs extends CredentialFormatService[]> {
    /**
     * Create a {@link V2ProposeCredentialMessage}.
     *
     * @param options
     * @returns The created {@link V2ProposeCredentialMessage}
     *
     */
    createProposal(agentContext: AgentContext, { credentialFormats, formatServices, credentialRecord, comment, }: {
        formatServices: CredentialFormatService[];
        credentialFormats: CredentialFormatPayload<ExtractCredentialFormats<CFs>, 'createProposal'>;
        credentialRecord: CredentialExchangeRecord;
        comment?: string;
    }): Promise<V2ProposeCredentialMessage>;
    processProposal(agentContext: AgentContext, { credentialRecord, message, formatServices, }: {
        credentialRecord: CredentialExchangeRecord;
        message: V2ProposeCredentialMessage;
        formatServices: CredentialFormatService[];
    }): Promise<void>;
    acceptProposal(agentContext: AgentContext, { credentialRecord, credentialFormats, formatServices, comment, }: {
        credentialRecord: CredentialExchangeRecord;
        credentialFormats?: CredentialFormatPayload<ExtractCredentialFormats<CFs>, 'acceptProposal'>;
        formatServices: CredentialFormatService[];
        comment?: string;
    }): Promise<V2OfferCredentialMessage>;
    /**
     * Create a {@link V2OfferCredentialMessage}.
     *
     * @param options
     * @returns The created {@link V2OfferCredentialMessage}
     *
     */
    createOffer(agentContext: AgentContext, { credentialFormats, formatServices, credentialRecord, comment, }: {
        formatServices: CredentialFormatService[];
        credentialFormats: CredentialFormatPayload<ExtractCredentialFormats<CFs>, 'createOffer'>;
        credentialRecord: CredentialExchangeRecord;
        comment?: string;
    }): Promise<V2OfferCredentialMessage>;
    processOffer(agentContext: AgentContext, { credentialRecord, message, formatServices, }: {
        credentialRecord: CredentialExchangeRecord;
        message: V2OfferCredentialMessage;
        formatServices: CredentialFormatService[];
    }): Promise<void>;
    acceptOffer(agentContext: AgentContext, { credentialRecord, credentialFormats, formatServices, comment, }: {
        credentialRecord: CredentialExchangeRecord;
        credentialFormats?: CredentialFormatPayload<ExtractCredentialFormats<CFs>, 'acceptOffer'>;
        formatServices: CredentialFormatService[];
        comment?: string;
    }): Promise<V2RequestCredentialMessage>;
    /**
     * Create a {@link V2RequestCredentialMessage}.
     *
     * @param options
     * @returns The created {@link V2RequestCredentialMessage}
     *
     */
    createRequest(agentContext: AgentContext, { credentialFormats, formatServices, credentialRecord, comment, }: {
        formatServices: CredentialFormatService[];
        credentialFormats: CredentialFormatPayload<ExtractCredentialFormats<CFs>, 'createRequest'>;
        credentialRecord: CredentialExchangeRecord;
        comment?: string;
    }): Promise<V2RequestCredentialMessage>;
    processRequest(agentContext: AgentContext, { credentialRecord, message, formatServices, }: {
        credentialRecord: CredentialExchangeRecord;
        message: V2RequestCredentialMessage;
        formatServices: CredentialFormatService[];
    }): Promise<void>;
    acceptRequest(agentContext: AgentContext, { credentialRecord, credentialFormats, formatServices, comment, }: {
        credentialRecord: CredentialExchangeRecord;
        credentialFormats?: CredentialFormatPayload<ExtractCredentialFormats<CFs>, 'acceptRequest'>;
        formatServices: CredentialFormatService[];
        comment?: string;
    }): Promise<V2IssueCredentialMessage>;
    processCredential(agentContext: AgentContext, { credentialRecord, message, requestMessage, formatServices, }: {
        credentialRecord: CredentialExchangeRecord;
        message: V2IssueCredentialMessage;
        requestMessage: V2RequestCredentialMessage;
        formatServices: CredentialFormatService[];
    }): Promise<void>;
    getAttachmentForService(credentialFormatService: CredentialFormatService, formats: CredentialFormatSpec[], attachments: Attachment[]): Attachment;
    private getAttachmentIdForService;
}
