import type { StoreCredentialOptions } from './W3cCredentialServiceOptions';
import type { W3cVerifiableCredential } from './models';
import type { W3cCredentialRecord } from './repository';
import type { Query } from '../../storage/StorageService';
import { AgentContext } from '../../agent';
import { W3cCredentialService } from './W3cCredentialService';
/**
 * @public
 */
export declare class W3cCredentialsApi {
    private agentContext;
    private w3cCredentialService;
    constructor(agentContext: AgentContext, w3cCredentialService: W3cCredentialService);
    storeCredential(options: StoreCredentialOptions): Promise<W3cCredentialRecord>;
    removeCredentialRecord(id: string): Promise<void>;
    getAllCredentialRecords(): Promise<W3cCredentialRecord[]>;
    getCredentialRecordById(id: string): Promise<W3cCredentialRecord>;
    findCredentialRecordsByQuery(query: Query<W3cCredentialRecord>): Promise<W3cVerifiableCredential[]>;
}
