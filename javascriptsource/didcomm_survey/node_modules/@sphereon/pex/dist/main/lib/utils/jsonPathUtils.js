"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPathUtils = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
class JsonPathUtils {
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
                result = jsonpath_1.JSONPath.nodes(obj, path);
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
        const stringPath = typeof path === 'string' ? path : jsonpath_1.JSONPath.stringify(path);
        jsonpath_1.JSONPath.value(obj, stringPath, newValue);
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
exports.JsonPathUtils = JsonPathUtils;
JsonPathUtils.matchAll = require('string.prototype.matchall');
JsonPathUtils.REGEX_PATH = /@\w+/g;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblBhdGhVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlscy9qc29uUGF0aFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNEQUF5RDtBQUt6RCxNQUFhLGFBQWE7SUFHeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQW1CLEVBQUUsS0FBZTtRQUNsRSxJQUFJLE1BQU0sR0FBZ0QsRUFBRSxDQUFDO1FBQzdELElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN6QixNQUFNLEdBQUcsbUJBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbEIsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTSxDQUFDLDZCQUE2QixDQUN6QyxFQUF1RCxFQUN2RCxtQkFBMkIsRUFDM0IsZUFBdUI7UUFFdkIsTUFBTSxhQUFhLEdBQW9ELGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBQzFJLEtBQUssTUFBTSxZQUFZLElBQUksYUFBYSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBTyxHQUFNLEVBQUUsSUFBOEIsRUFBRSxRQUFXO1FBQzlFLE1BQU0sVUFBVSxHQUFHLE9BQU8sSUFBSSxLQUFL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