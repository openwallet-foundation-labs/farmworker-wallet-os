import { JSONPath as jp } from '@astronautlabs/jsonpath';
import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class MarkForSubmissionEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'MarkForSubmissionEvaluation';
    }
    handle(pd, wrappedVcs) {
        const results = [...this.getResults()];
        const errors = results.filter((result) => result.status === Status.ERROR);
        const infos = this.retrieveNoErrorStatus(results, errors);
        this.client.wrappedVcs = wrappedVcs;
        this.produceErrorResults(errors);
        this.produceSuccessResults(infos, pd);
    }
    retrieveNoErrorStatus(results, errors) {
        const info = results.filter((e) => e.status !== Status.ERROR);
        return info.filter((a) => !errors.find((b) => a.input_descriptor_path === b.input_descriptor_path && a.verifiable_credential_path === b.verifiable_credential_path));
    }
    produceSuccessResults(infos, pd) {
        this.removeDuplicate(infos).forEach((info) => {
            const parsedPath = jp.nodes(pd, info.input_descriptor_path);
            const group = parsedPath[0].value.group;
            this.getResults().push({
                input_descriptor_path: info.input_descriptor_path,
                verifiable_credential_path: info.verifiable_credential_path,
                evaluator: this.getName(),
                status: Status.INFO,
                payload: { group },
                message: PexMessages.INPUT_CANDIDATE_IS_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
            });
        });
    }
    produceErrorResults(errors) {
        this.removeDuplicate(errors).forEach((error) => {
            const payload = { ...error.payload };
            payload.evaluator = error.evaluator;
            this.getResults().push({
                ...error,
                evaluator: this.getName(),
                message: PexMessages.INPUT_CANDIDATE_IS_NOT_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
                payload: payload,
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya0ZvclN1Ym1pc3Npb25FdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL21hcmtGb3JTdWJtaXNzaW9uRXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsSUFBSSxFQUFFLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUd6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFJL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFeEUsTUFBTSxPQUFPLGtDQUFtQyxTQUFRLHlCQUF5QjtJQUMvRSxZQUFZLE1BQXdCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sNkJBQTZCLENBQUM7SUFDdkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFtQyxFQUFFLFVBQXlDO1FBQzFGLE1BQU0sT0FBTyxHQUF5QixDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQXlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUEwQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwSCxNQUFNLEtBQUssR0FBeUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLHFCQUFxQixDQUFDLE9BQTZCLEVBQUUsTUFBNEI7UUFDdkYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUNoQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0osQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixJQUFJLENBQUMsQ0FBQywwQkFBMEIsS0FBSyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FDNUksQ0FBQztJQUNKLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUEyQixFQUFFLEVBQW1DO1FBQzVGLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDNUQsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDeEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDckIscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtnQkFDakQsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjtnQkFDM0QsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pCLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDbkIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFO2dCQUNsQixPQUFPLEVBQUUsV0FBVyxDQUFDLHVEQUF1RDthQUM3RSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxNQUE0QjtRQUN0RCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdDLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckMsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEdBQUcsS0FBSztnQkFDUixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsT0FBTyxFQUFFLFdBQVcsQ0FBQywyREFBMkQ7Z0JBQ2hGLE9BQU8sRUFBRSxPQUFPO2FBQ2pCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIn0=