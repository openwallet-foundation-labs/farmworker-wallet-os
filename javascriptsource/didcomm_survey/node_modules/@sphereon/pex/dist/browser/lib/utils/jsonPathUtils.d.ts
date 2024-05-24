import { PresentationDefinitionV1, PresentationDefinitionV2 } from '@sphereon/pex-models';
import { InputFieldType, IPresentationDefinition, PathComponent } from '../types';
export declare class JsonPathUtils {
    static matchAll: any;
    static REGEX_PATH: RegExp;
    /**
     * @param obj: any object can be found in verifiablePresentation.verifiableCredential[i]
     * @param paths: paths that can be found in Field object
     * @return a result object containing value of the correct path in the verifiableCredential and the correct path
     * @example(success result): if you call this method with 1. verifiableCredential:
     *   {
          '@context': [''],
          age: 19,
          credentialSchema: [ { id: '' } ],
          id: '2dc74354-e965-4883-be5e-bfec48bf60c7',
          issuer: '',
          type: 'VerifiableCredential'
        }
     and 2 paths: [ '$.age', '$.details.age ]
     you will get result: [ { value: 19, path: [ '$', 'age' ] } ]
  
     @example(fail result): if you call this method with 1. verifiableCredential:
     {
          '@context': [ '' ],
          credentialSchema: [ { id: '' } ],
          id: '2dc74354-e965-4883-be5e-bfec48bf60c7',
          issuer: '',
          type: 'VerifiableCredential'
        }
     and 2. paths: [ '$.age' ],
     you will get result: result: []
     @example (array example):
     vc: {
          '@context': [''],
          "details": {
          "information":[
            {
              "age": 19
            }]
        },
          credentialSchema: [ { id: '' } ],
          id: '2dc74354-e965-4883-be5e-bfec48bf60c7',
          issuer: '',
          type: 'VerifiableCredential'
        }
     result: [ { value: 19, path: [ '$', 'details', 'information', 0, 'age' ] } ]
     */
    static extractInputField(obj: InputFieldType, paths: string[]): {
        value: unknown;
        path: PathComponent[];
    }[];
    static changePropertyNameRecursively(pd: PresentationDefinitionV1 | PresentationDefinitionV2, currentPropertyName: string, newPropertyName: string): void;
    static setValue<O, T>(obj: O, path: string | PathComponent[], newValue: T): O;
    private static copyResultPathToDestinationDefinition;
    static changeSpecialPathsRecursively(pd: IPresentationDefinition): void;
    private static modifyPathsWithSpecialCharacter;
    private static modifyPathWithSpecialCharacter;
    private static modifyPathRecursive;
}
