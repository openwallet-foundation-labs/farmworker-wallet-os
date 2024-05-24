import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class FormatRestrictionEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'FormatRestrictionEvaluation';
    }
    handle(pd, wrappedVcs) {
        const restrictToFormats = this.client.restrictToFormats ? Object.keys(this.client.restrictToFormats) : undefined;
        pd.input_descriptors.forEach((_inputDescriptor, index) => {
            wrappedVcs.forEach((wvc, vcIndex) => {
                const formats = 'format' in _inputDescriptor && _inputDescriptor.format ? Object.keys(_inputDescriptor.format) : [wvc.format];
                let allowedFormats = restrictToFormats ?? formats;
                if ('format' in _inputDescriptor && _inputDescriptor.format && restrictToFormats !== undefined) {
                    // Take the instersection, as an argument has been supplied for restrictions
                    allowedFormats = Object.keys(_inputDescriptor.format).filter((k) => restrictToFormats.includes(k));
                }
                if (allowedFormats.includes(wvc.format)) {
                    this.getResults().push(this.generateSuccessResult(index, `$[${vcIndex}]`, wvc, `${wvc.format} is allowed from ${JSON.stringify(allowedFormats)}`));
                }
                else {
                    this.getResults().push(this.generateErrorResult(index, `$[${vcIndex}]`, wvc));
                }
            });
        });
        this.updatePresentationSubmission(pd);
    }
    generateErrorResult(idIdx, vcPath, wvc) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            evaluator: this.getName(),
            status: Status.ERROR,
            message: PexMessages.FORMAT_RESTRICTION_DIDNT_PASS,
            verifiable_credential_path: vcPath,
            payload: {
                format: wvc.format,
            },
        };
    }
    generateSuccessResult(idIdx, vcPath, wvc, message) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            evaluator: this.getName(),
            status: Status.INFO,
            message: message ?? PexMessages.FORMAT_RESTRICTION_PASSED,
            verifiable_credential_path: vcPath,
            payload: {
                format: wvc.format,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0UmVzdHJpY3Rpb25FdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL2Zvcm1hdFJlc3RyaWN0aW9uRXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBSS9DLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXhFLE1BQU0sT0FBTyxrQ0FBbUMsU0FBUSx5QkFBeUI7SUFDL0UsWUFBWSxNQUF3QjtRQUNsQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLDZCQUE2QixDQUFDO0lBQ3ZDLENBQUM7SUFFTSxNQUFNLENBQUMsRUFBbUMsRUFBRSxVQUF5QztRQUMxRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFaEgsRUFBMEUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBZ0MsRUFBRSxPQUFlLEVBQUUsRUFBRTtnQkFDdkUsTUFBTSxPQUFPLEdBQUcsUUFBUSxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlILElBQUksY0FBYyxHQUFHLGlCQUFpQixJQUFJLE9BQU8sQ0FBQztnQkFDbEQsSUFBSSxRQUFRLElBQUksZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRSxDQUFDO29CQUMvRiw0RUFBNEU7b0JBQzVFLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JHLENBQUM7Z0JBQ0QsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUN4QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLEtBQUssT0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sb0JBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUMzSCxDQUFDO2dCQUNKLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxPQUFPLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxHQUFnQztRQUN6RixPQUFPO1lBQ0wscUJBQXFCLEVBQUUsdUJBQXVCLEtBQUssR0FBRztZQUN0RCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN6QixNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyw2QkFBNkI7WUFDbEQsMEJBQTBCLEVBQUUsTUFBTTtZQUNsQyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLEdBQWdDLEVBQUUsT0FBZ0I7UUFDN0csT0FBTztZQUNMLHFCQUFxQixFQUFFLHVCQUF1QixLQUFLLEdBQUc7WUFDdEQsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ25CLE9BQU8sRUFBRSxPQUFPLElBQUksV0FBVyxDQUFDLHlCQUF5QjtZQUN6RCwwQkFBMEIsRUFBRSxNQUFNO1lBQ2xDLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=