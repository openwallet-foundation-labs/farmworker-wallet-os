"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEvaluationHandler = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const ConstraintUtils_1 = require("../../ConstraintUtils");
class AbstractEvaluationHandler {
    constructor(_client) {
        this._client = _client;
    }
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    getNext() {
        return this.nextHandler;
    }
    hasNext() {
        return this.nextHandler != undefined;
    }
    get client() {
        return this._client;
    }
    get wrappedVcs() {
        return this._client.wrappedVcs;
    }
    set wrappedVcs(wrappedVcs) {
        this._client.wrappedVcs = wrappedVcs;
    }
    get presentationSubmission() {
        return this._client.presentationSubmission;
    }
    set presentationSubmission(presentationSubmission) {
        this._client.presentationSubmission = presentationSubmission;
    }
    getResults() {
        return this._client.results;
    }
    updatePresentationSubmission(pd) {
        this._client.assertPresentationSubmission();
        this.presentationSubmission.descriptor_map.forEach((descriptor, index, descriptorMap) => {
            /**
               * TODO map the nested credential
               let vcPath = jp.stringify(e.payload.result.path)
               */
            let inputDescriptor;
            const result = this.getResults()
                .filter((r) => r.status === ConstraintUtils_1.Status.ERROR && r.evaluator === this.getName())
                .find((result) => {
                inputDescriptor = jsonpath_1.JSONPath.query(pd, result.input_descriptor_path)[0];
                return result.verifiable_credential_path === descriptor.path && (inputDescriptor === null || inputDescriptor === void 0 ? void 0 : inputDescriptor.id) === descriptor.id;
            });
            if (result) {
                delete descriptorMap[index];
            }
        });
    }
    removeDuplicate(results) {
        return results.reduce((arr, cur) => {
            const result = arr.find((i) => i.input_descriptor_path === cur.input_descriptor_path && i.verifiable_credential_path === cur.verifiable_credential_path);
            if (!result) {
                return arr.concat([cur]);
            }
            else {
                return arr;
            }
        }, []);
    }
}
exports.AbstractEvaluationHandler = AbstractEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RFdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL2Fic3RyYWN0RXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQXlEO0FBSXpELDJEQUErQztBQU8vQyxNQUFzQix5QkFBeUI7SUFHN0MsWUFBb0IsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7SUFBRyxDQUFDO0lBRTFDLE9BQU8sQ0FBQyxPQUEwQjtRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMzQixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBSU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBSUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELElBQVcsVUFBVSxDQUFDLFVBQXlDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBVyxzQkFBc0I7UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFXLHNCQUFzQixDQUFDLHNCQUE4QztRQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0lBQy9ELENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRU0sNEJBQTRCLENBQUMsRUFBbUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRTtZQUN0Rjs7O2lCQUdLO1lBQ0wsSUFBSSxlQUFzRCxDQUFDO1lBQzNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7aUJBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyx3QkFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDMUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2YsZUFBZSxHQUFHLG1CQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxNQUFNLENBQUMsMEJBQTBCLEtBQUssVUFBVSxDQUFDLElBQUksSUFBSSxDQUFBLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxFQUFFLE1BQUssVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4RyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ1gsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGVBQWUsQ0FBQyxPQUE2QjtRQUNsRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUF5QixFQUFFLEdBQXVCLEVBQUUsRUFBRTtZQUMzRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUNyQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsMEJBQTBCLEtBQUssR0FBRyxDQUFDLDBCQUEwQixDQUNoSSxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7Q0FDRjtBQTlFRCw4REE4RUMifQ==