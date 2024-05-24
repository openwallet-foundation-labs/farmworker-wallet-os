export declare function isValidPeerDid(did: string): boolean;
export declare enum PeerDidNumAlgo {
    InceptionKeyWithoutDoc = 0,
    GenesisDoc = 1,
    MultipleInceptionKeyWithoutDoc = 2,
    ShortFormAndLongForm = 4
}
export declare function getNumAlgoFromPeerDid(did: string): PeerDidNumAlgo;
/**
 * Given a peer did, returns any alternative forms equivalent to it.
 *
 * @param did
 * @returns array of alternative dids or undefined if not applicable
 */
export declare function getAlternativeDidsForPeerDid(did: string): string[] | undefined;
