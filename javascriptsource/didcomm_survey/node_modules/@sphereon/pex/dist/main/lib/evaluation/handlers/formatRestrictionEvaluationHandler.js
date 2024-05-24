"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatRestrictionEvaluationHandler = void 0;
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class FormatRestrictionEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
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
                let allowedFormats = restrictToFormats !== null && restrictToFormats !== void 0 ? restrictToFormats : formats;
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
            status: ConstraintUtils_1.Status.ERROR,
            message: Messages_1.default.FORMAT_RESTRICTION_DIDNT_PASS,
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
            status: ConstraintUtils_1.Status.INFO,
            message: message !== null && message !== void 0 ? message : Messages_1.default.FORMAT_RESTRICTION_PASSED,
            verifiable_credential_path: vcPath,
            payload: {
                format: wvc.format,
            },
        };
    }
}
exports.FormatRestrictionEvaluationHandler = FormatRestrictionEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0UmVzdHJpY3Rpb25FdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL2Zvcm1hdFJlc3RyaWN0aW9uRXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsMkRBQStDO0FBRS9DLG9FQUErQztBQUkvQywyRUFBd0U7QUFFeEUsTUFBYSxrQ0FBbUMsU0FBUSxxREFBeUI7SUFDL0UsWUFBWSxNQUF3QjtRQUNsQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLDZCQUE2QixDQUFDO0lBQ3ZDLENBQUM7SUFFTSxNQUFNLENBQUMsRUFBbUMsRUFBRSxVQUF5QztRQUMxRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFaEgsRUFBMEUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBZ0MsRUFBRSxPQUFlLEVBQUUsRUFBRTtnQkFDdkUsTUFBTSxPQUFPLEdBQUcsUUFBUSxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlILElBQUksY0FBYyxHQUFHLGlCQUFpQixhQUFqQixpQkFBaUIsY0FBakIsaUJBQWlCLEdBQUksT0FBTyxDQUFDO2dCQUNsRCxJQUFJLFFBQVEsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLElBQUksaUJBQWlCLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBQy9GLDRFQUE0RTtvQkFDNUUsY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckcsQ0FBQztnQkFDRCxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxvQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQzNILENBQUM7Z0JBQ0osQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLE9BQU8sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLEdBQWdDO1FBQ3pGLE9BQU87WUFDTCxxQkFBcUIsRUFBRSx1QkFBdUIsS0FBSyxHQUFHO1lBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSx3QkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLGtCQUFXLENBQUMsNkJBQTZCO1lBQ2xELDBCQUEwQixFQUFFLE1BQU07WUFDbEMsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxHQUFnQyxFQUFFLE9BQWdCO1FBQzdHLE9BQU87WUFDTCxxQkFBcUIsRUFBRSx1QkFBdUIsS0FBSyxHQUFHO1lBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSx3QkFBTSxDQUFDLElBQUk7WUFDbkIsT0FBTyxFQUFFLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLGtCQUFXLENBQUMseUJBQXlCO1lBQ3pELDBCQUEwQixFQUFFLE1BQU07WUFDbEMsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUExREQsZ0ZBMERDIn0=