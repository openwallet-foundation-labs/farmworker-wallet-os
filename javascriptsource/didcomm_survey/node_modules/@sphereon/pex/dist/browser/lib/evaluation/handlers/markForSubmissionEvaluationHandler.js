"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkForSubmissionEvaluationHandler = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class MarkForSubmissionEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'MarkForSubmissionEvaluation';
    }
    handle(pd, wrappedVcs) {
        const results = [...this.getResults()];
        const errors = results.filter((result) => result.status === ConstraintUtils_1.Status.ERROR);
        const infos = this.retrieveNoErrorStatus(results, errors);
        this.client.wrappedVcs = wrappedVcs;
        this.produceErrorResults(errors);
        this.produceSuccessResults(infos, pd);
    }
    retrieveNoErrorStatus(results, errors) {
        const info = results.filter((e) => e.status !== ConstraintUtils_1.Status.ERROR);
        return info.filter((a) => !errors.find((b) => a.input_descriptor_path === b.input_descriptor_path && a.verifiable_credential_path === b.verifiable_credential_path));
    }
    produceSuccessResults(infos, pd) {
        this.removeDuplicate(infos).forEach((info) => {
            const parsedPath = jsonpath_1.JSONPath.nodes(pd, info.input_descriptor_path);
            const group = parsedPath[0].value.group;
            this.getResults().push({
                input_descriptor_path: info.input_descriptor_path,
                verifiable_credential_path: info.verifiable_credential_path,
                evaluator: this.getName(),
                status: ConstraintUtils_1.Status.INFO,
                payload: { group },
                message: Messages_1.default.INPUT_CANDIDATE_IS_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
            });
        });
    }
    produceErrorResults(errors) {
        this.removeDuplicate(errors).forEach((error) => {
            const payload = Object.assign({}, error.payload);
            payload.evaluator = error.evaluator;
            this.getResults().push(Object.assign(Object.assign({}, error), { evaluator: this.getName(), message: Messages_1.default.INPUT_CANDIDATE_IS_NOT_ELIGIBLE_FOR_PRESENTATION_SUBMISSION, payload: payload }));
        });
    }
}
exports.MarkForSubmissionEvaluationHandler = MarkForSubmissionEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya0ZvclN1Ym1pc3Npb25FdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL21hcmtGb3JTdWJtaXNzaW9uRXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQXlEO0FBR3pELDJEQUErQztBQUUvQyxvRUFBK0M7QUFJL0MsMkVBQXdFO0FBRXhFLE1BQWEsa0NBQW1DLFNBQVEscURBQXlCO0lBQy9FLFlBQVksTUFBd0I7UUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyw2QkFBNkIsQ0FBQztJQUN2QyxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQW1DLEVBQUUsVUFBeUM7UUFDMUYsTUFBTSxPQUFPLEdBQXlCLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBeUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQTBCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssd0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwSCxNQUFNLEtBQUssR0FBeUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLHFCQUFxQixDQUFDLE9BQTZCLEVBQUUsTUFBNEI7UUFDdkYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyx3QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FDaEIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNKLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLENBQUMsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsMEJBQTBCLEtBQUssQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQzVJLENBQUM7SUFDSixDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBMkIsRUFBRSxFQUFtQztRQUM1RixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNDLE1BQU0sVUFBVSxHQUFHLG1CQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM1RCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN4QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNyQixxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO2dCQUNqRCwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCO2dCQUMzRCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsTUFBTSxFQUFFLHdCQUFNLENBQUMsSUFBSTtnQkFDbkIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFO2dCQUNsQixPQUFPLEVBQUUsa0JBQVcsQ0FBQyx1REFBdUQ7YUFDN0UsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsTUFBNEI7UUFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE9BQU8scUJBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBRSxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxpQ0FDakIsS0FBSyxLQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ3pCLE9BQU8sRUFBRSxrQkFBVyxDQUFDLDJEQUEyRCxFQUNoRixPQUFPLEVBQUUsT0FBTyxJQUNoQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyREQsZ0ZBcURDIn0=