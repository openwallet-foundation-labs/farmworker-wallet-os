"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDRestrictionEvaluationHandler = void 0;
const ssi_types_1 = require("@sphereon/ssi-types");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const utils_1 = require("../../utils");
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class DIDRestrictionEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'DIDRestrictionEvaluation';
    }
    handle(pd, wrappedVcs) {
        pd.input_descriptors.forEach((_inputDescriptor, index) => {
            wrappedVcs.forEach((wvc, vcIndex) => {
                const issuerId = this.getIssuerIdFromWrappedVerifiableCredential(wvc);
                if (!this.client.hasRestrictToDIDMethods() ||
                    !issuerId ||
                    (0, utils_1.isRestrictedDID)(issuerId, this.client.restrictToDIDMethods) ||
                    !issuerId.toLowerCase().startsWith('did:')) {
                    this.getResults().push(this.generateSuccessResult(index, `$[${vcIndex}]`, wvc, `${issuerId} is allowed`));
                }
                else {
                    this.getResults().push(this.generateErrorResult(index, `$[${vcIndex}]`, wvc));
                }
            });
        });
        this.updatePresentationSubmission(pd);
    }
    getIssuerIdFromWrappedVerifiableCredential(wrappedVc) {
        if (ssi_types_1.CredentialMapper.isW3cCredential(wrappedVc.credential)) {
            return typeof wrappedVc.credential.issuer === 'object' ? wrappedVc.credential.issuer.id : wrappedVc.credential.issuer;
        }
        else if (ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(wrappedVc.credential)) {
            return wrappedVc.credential.decodedPayload.iss;
        }
        throw new Error('Unsupported credential type');
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
exports.DIDRestrictionEvaluationHandler = DIDRestrictionEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlkUmVzdHJpY3Rpb25FdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL2RpZFJlc3RyaWN0aW9uRXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQW9GO0FBRXBGLDJEQUErQztBQUUvQyxvRUFBK0M7QUFDL0MsdUNBQThDO0FBSTlDLDJFQUF3RTtBQUV4RSxNQUFhLCtCQUFnQyxTQUFRLHFEQUF5QjtJQUM1RSxZQUFZLE1BQXdCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sMEJBQTBCLENBQUM7SUFDcEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFtQyxFQUFFLFVBQXlDO1FBQ3pGLEVBQTBFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWdDLEVBQUUsT0FBZSxFQUFFLEVBQUU7Z0JBQ3ZFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEUsSUFDRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUU7b0JBQ3RDLENBQUMsUUFBUTtvQkFDVCxJQUFBLHVCQUFlLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7b0JBQzNELENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDMUMsQ0FBQztvQkFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzVHLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxPQUFPLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sMENBQTBDLENBQUMsU0FBc0M7UUFDdkYsSUFBSSw0QkFBZ0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDM0QsT0FBTyxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN4SCxDQUFDO2FBQU0sSUFBSSw0QkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUMzRSxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUNqRCxDQUFDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLEdBQWdDO1FBQ3pGLE9BQU87WUFDTCxxQkFBcUIsRUFBRSx1QkFBdUIsS0FBSyxHQUFHO1lBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSx3QkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLGtCQUFXLENBQUMsNkJBQTZCO1lBQ2xELDBCQUEwQixFQUFFLE1BQU07WUFDbEMsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxHQUFnQyxFQUFFLE9BQWdCO1FBQzdHLE9BQU87WUFDTCxxQkFBcUIsRUFBRSx1QkFBdUIsS0FBSyxHQUFHO1lBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSx3QkFBTSxDQUFDLElBQUk7WUFDbkIsT0FBTyxFQUFFLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLGtCQUFXLENBQUMseUJBQXlCO1lBQ3pELDBCQUEwQixFQUFFLE1BQU07WUFDbEMsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoRUQsMEVBZ0VDIn0=