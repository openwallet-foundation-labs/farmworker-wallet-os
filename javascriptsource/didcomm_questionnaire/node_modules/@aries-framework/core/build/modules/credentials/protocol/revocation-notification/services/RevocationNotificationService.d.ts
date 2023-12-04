import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V1RevocationNotificationMessage } from '../messages/V1RevocationNotificationMessage';
import type { V2RevocationNotificationMessage } from '../messages/V2RevocationNotificationMessage';
import { EventEmitter } from '../../../../../agent/EventEmitter';
import { MessageHandlerRegistry } from '../../../../../agent/MessageHandlerRegistry';
import { Logger } from '../../../../../logger';
import { CredentialRepository } from '../../../repository';
export declare class RevocationNotificationService {
    private credentialRepository;
    private eventEmitter;
    private logger;
    constructor(credentialRepository: CredentialRepository, eventEmitter: EventEmitter, messageHandlerRegistry: MessageHandlerRegistry, logger: Logger);
    private processRevocationNotification;
    /**
     * Process a received {@link V1RevocationNotificationMessage}. This will create a
     * {@link RevocationNotification} and store it in the corresponding {@link CredentialRecord}
     *
     * @param messageContext message context of RevocationNotificationMessageV1
     */
    v1ProcessRevocationNotification(messageContext: InboundMessageContext<V1RevocationNotificationMessage>): Promise<void>;
    /**
     * Process a received {@link V2RevocationNotificationMessage}. This will create a
     * {@link RevocationNotification} and store it in the corresponding {@link CredentialRecord}
     *
     * @param messageContext message context of RevocationNotificationMessageV2
     */
    v2ProcessRevocationNotification(messageContext: InboundMessageContext<V2RevocationNotificationMessage>): Promise<void>;
    private registerMessageHandlers;
}
