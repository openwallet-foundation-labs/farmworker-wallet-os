import type { Authentication } from './authentication';
import type { PublicKey } from './publicKey';
import type { DidDocumentService } from '../../../dids/domain/service';
import { DidCommV1Service, IndyAgentService } from '../../../dids/domain/service';
type DidDocOptions = Pick<DidDoc, 'id' | 'publicKey' | 'service' | 'authentication'>;
export declare class DidDoc {
    context: string;
    id: string;
    publicKey: PublicKey[];
    service: DidDocumentService[];
    authentication: Authentication[];
    constructor(options: DidDocOptions);
    /**
     * Gets the matching public key for a given key id
     *
     * @param id fully qualified key id
     */
    getPublicKey(id: string): PublicKey | undefined;
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType<S extends DidDocumentService = DidDocumentService>(type: string): S[];
    /**
     * Returns all of the service endpoints matching the given class
     *
     * @param classType The class to query services.
     */
    getServicesByClassType<S extends DidDocumentService = DidDocumentService>(classType: new (...args: never[]) => S): S[];
    /**
     * Get all DIDComm services ordered by priority descending. This means the highest
     * priority will be the first entry.
     */
    get didCommServices(): Array<IndyAgentService | DidCommV1Service>;
}
export {};
