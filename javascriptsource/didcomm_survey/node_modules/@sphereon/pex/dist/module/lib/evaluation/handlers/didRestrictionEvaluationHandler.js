import { CredentialMapper } from '@sphereon/ssi-types';
import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { isRestrictedDID } from '../../utils';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class DIDRestrictionEvaluationHandler extends AbstractEvaluationHandler {
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
                    isRestrictedDID(issuerId, this.client.restrictToDIDMethods) ||
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
        if (CredentialMapper.isW3cCredential(wrappedVc.credential)) {
            return typeof wrappedVc.credential.issuer === 'object' ? wrappedVc.credential.issuer.id : wrappedVc.credential.issuer;
        }
        else if (CredentialMapper.isSdJwtDecodedCredential(wrappedVc.credential)) {
            return wrappedVc.credential.decodedPayload.iss;
        }
        throw new Error('Unsupported credential type');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlkUmVzdHJpY3Rpb25FdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL2RpZFJlc3RyaWN0aW9uRXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUErQixNQUFNLHFCQUFxQixDQUFDO0FBRXBGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQyxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTlDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXhFLE1BQU0sT0FBTywrQkFBZ0MsU0FBUSx5QkFBeUI7SUFDNUUsWUFBWSxNQUF3QjtRQUNsQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLDBCQUEwQixDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsRUFBbUMsRUFBRSxVQUF5QztRQUN6RixFQUEwRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFnQyxFQUFFLE9BQWUsRUFBRSxFQUFFO2dCQUN2RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsMENBQTBDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RFLElBQ0UsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFO29CQUN0QyxDQUFDLFFBQVE7b0JBQ1QsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO29CQUMzRCxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQzFDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLEtBQUssT0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsUUFBUSxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUssT0FBTyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsNEJBQTRCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLDBDQUEwQyxDQUFDLFNBQXNDO1FBQ3ZGLElBQUksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQzNELE9BQU8sT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDeEgsQ0FBQzthQUFNLElBQUksZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDM0UsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDakQsQ0FBQztRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxHQUFnQztRQUN6RixPQUFPO1lBQ0wscUJBQXFCLEVBQUUsdUJBQXVCLEtBQUssR0FBRztZQUN0RCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN6QixNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyw2QkFBNkI7WUFDbEQsMEJBQTBCLEVBQUUsTUFBTTtZQUNsQyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLEdBQWdDLEVBQUUsT0FBZ0I7UUFDN0csT0FBTztZQUNMLHFCQUFxQixFQUFFLHVCQUF1QixLQUFLLEdBQUc7WUFDdEQsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ25CLE9BQU8sRUFBRSxPQUFPLElBQUksV0FBVyxDQUFDLHlCQUF5QjtZQUN6RCwwQkFBMEIsRUFBRSxNQUFNO1lBQ2xDLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=