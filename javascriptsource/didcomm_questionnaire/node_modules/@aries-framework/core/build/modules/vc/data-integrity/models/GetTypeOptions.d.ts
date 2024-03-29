import type { DocumentLoader } from '../jsonldUtil';
/**
 * Options for getting the type from a JSON-LD document
 */
export interface GetTypeOptions {
    /**
     * Optional custom document loader
     */
    documentLoader?: DocumentLoader;
    /**
     * Optional expansion map
     */
    expansionMap?: () => void;
}
