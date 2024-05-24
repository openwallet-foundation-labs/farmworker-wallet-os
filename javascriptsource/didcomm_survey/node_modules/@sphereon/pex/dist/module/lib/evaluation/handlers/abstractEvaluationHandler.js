import { JSONPath as jp } from '@astronautlabs/jsonpath';
import { Status } from '../../ConstraintUtils';
export class AbstractEvaluationHandler {
    _client;
    nextHandler;
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
                .filter((r) => r.status === Status.ERROR && r.evaluator === this.getName())
                .find((result) => {
                inputDescriptor = jp.query(pd, result.input_descriptor_path)[0];
                return result.verifiable_credential_path === descriptor.path && inputDescriptor?.id === descriptor.id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RFdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL2Fic3RyYWN0RXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsSUFBSSxFQUFFLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUl6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPL0MsTUFBTSxPQUFnQix5QkFBeUI7SUFHekI7SUFGWixXQUFXLENBQWdDO0lBRW5ELFlBQW9CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO0lBQUcsQ0FBQztJQUUxQyxPQUFPLENBQUMsT0FBMEI7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDM0IsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUlNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUlELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFXLFVBQVUsQ0FBQyxVQUF5QztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQVcsc0JBQXNCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBVyxzQkFBc0IsQ0FBQyxzQkFBOEM7UUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztJQUMvRCxDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDOUIsQ0FBQztJQUVNLDRCQUE0QixDQUFDLEVBQW1DO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUU7WUFDdEY7OztpQkFHSztZQUNMLElBQUksZUFBc0QsQ0FBQztZQUMzRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO2lCQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDMUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2YsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsS0FBSyxVQUFVLENBQUMsSUFBSSxJQUFJLGVBQWUsRUFBRSxFQUFFLEtBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4RyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ1gsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGVBQWUsQ0FBQyxPQUE2QjtRQUNsRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUF5QixFQUFFLEdBQXVCLEVBQUUsRUFBRTtZQUMzRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUNyQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsMEJBQTBCLEtBQUssR0FBRyxDQUFDLDBCQUEwQixDQUNoSSxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7Q0FDRiJ9