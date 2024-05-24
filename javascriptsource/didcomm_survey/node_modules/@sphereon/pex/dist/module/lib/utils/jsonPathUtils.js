import { JSONPath as jp } from '@astronautlabs/jsonpath';
export class JsonPathUtils {
    static matchAll = require('string.prototype.matchall');
    static REGEX_PATH = /@\w+/g;
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
    static extractInputField(obj, paths) {
        let result = [];
        if (paths) {
            for (const path of paths) {
                result = jp.nodes(obj, path);
                if (result.length) {
                    break;
                }
            }
        }
        return result;
    }
    static changePropertyNameRecursively(pd, currentPropertyName, newPropertyName) {
        const existingPaths = JsonPathUtils.extractInputField(pd, ['$..' + currentPropertyName]);
        for (const existingPath of existingPaths) {
            this.copyResultPathToDestinationDefinition(existingPath.path, pd, newPropertyName);
        }
    }
    static setValue(obj, path, newValue) {
        const stringPath = typeof path === 'string' ? path : jp.stringify(path);
        jp.value(obj, stringPath, newValue);
        return obj;
    }
    static copyResultPathToDestinationDefinition(pathDetails, pd, newPropertyName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let objectCursor = pd;
        for (let i = 1; i < pathDetails.length; i++) {
            if (i + 1 < pathDetails.length) {
                objectCursor = objectCursor[pathDetails[i]];
            }
            if (pathDetails.length == i + 1) {
                objectCursor[newPropertyName] = objectCursor[pathDetails[i]];
                delete objectCursor[pathDetails[i]];
                break;
            }
        }
    }
    static changeSpecialPathsRecursively(pd) {
        const paths = JsonPathUtils.extractInputField(pd, ['$..path']);
        for (const path of paths) {
            this.modifyPathsWithSpecialCharacter(path.path, pd);
        }
    }
    static modifyPathsWithSpecialCharacter(pathDetails, pd) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let objectCursor = pd;
        for (let i = 1; i < pathDetails.length; i++) {
            if (i + 1 < pathDetails.length) {
                objectCursor = objectCursor[pathDetails[i]];
            }
            if (pathDetails.length == i + 1) {
                const paths = objectCursor[pathDetails[i]];
                const editedPaths = [];
                for (let j = 0; j < paths.length; j++) {
                    editedPaths.push(this.modifyPathWithSpecialCharacter(paths[j]));
                }
                objectCursor[pathDetails[i]] = editedPaths;
                break;
            }
        }
    }
    static modifyPathWithSpecialCharacter(path) {
        const matches = this.matchAll(path, this.REGEX_PATH);
        path = this.modifyPathRecursive(matches, path);
        return path;
    }
    static modifyPathRecursive(matches, path) {
        let next = matches.next();
        let indexChanged = false;
        while (next && !next.done && !indexChanged) {
            const atIdx = next.value.index;
            if (atIdx && atIdx == 1) {
                path = path.charAt(0) + "['" + next.value[0] + "']" + path.substring(atIdx + next.value[0].length);
                indexChanged = true;
                this.modifyPathRecursive(matches, path);
            }
            else if (atIdx && atIdx > 1 && path.substring(atIdx - 2, atIdx) !== "['" && path.substring(atIdx - 2, atIdx) !== '["') {
                if (path.substring(atIdx - 2, atIdx) === '..') {
                    path = path.substring(0, atIdx - 2) + "..['" + next.value[0] + "']" + path.substring(atIdx + next.value[0].length);
                    indexChanged = true;
                    const matches = this.matchAll(path, this.REGEX_PATH);
                    this.modifyPathRecursive(matches, path);
                }
                else if (path.charAt(atIdx - 1) === '.') {
                    path = path.substring(0, atIdx - 1) + "['" + next.value[0] + "']" + path.substring(atIdx + next.value[0].length);
                    indexChanged = true;
                    this.modifyPathRecursive(matches, path);
                }
            }
            next = matches.next();
        }
        return path;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblBhdGhVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlscy9qc29uUGF0aFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLElBQUksRUFBRSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLekQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBbUIsRUFBRSxLQUFlO1FBQ2xFLElBQUksTUFBTSxHQUFnRCxFQUFFLENBQUM7UUFDN0QsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyw2QkFBNkIsQ0FDekMsRUFBdUQsRUFDdkQsbUJBQTJCLEVBQzNCLGVBQXVCO1FBRXZCLE1BQU0sYUFBYSxHQUFvRCxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUMxSSxLQUFLLE1BQU0sWUFBWSxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNyRixDQUFDO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQU8sR0FBTSxFQUFFLElBQThCLEVBQUUsUUFBVztRQUM5RSxNQUFNLFVBQVUsR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFcEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU8sTUFBTSxDQUFDLHFDQUFxQyxDQUFDLFdBQWdDLEVBQUUsRUFBMkIsRUFBRSxlQUF1QjtRQUN6SSw4REFBOEQ7UUFDOUQsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0IsWUFBWSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBQ0QsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsNkJBQTZCLENBQUMsRUFBMkI7UUFDOUQsTUFBTSxLQUFLLEdBQW9ELGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2hILEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsK0JBQStCLENBQUMsV0FBZ0MsRUFBRSxFQUEyQjtRQUMxRyw4REFBOEQ7UUFDOUQsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0IsWUFBWSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBQ0QsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxLQUFLLEdBQWEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7Z0JBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7Z0JBQ0QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDM0MsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxJQUFZO1FBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBMkMsRUFBRSxJQUFZO1FBQzFGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDM0MsTUFBTSxLQUFLLEdBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ25ELElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25HLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQztpQkFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUN4SCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkgsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO3FCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pILFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDIn0=