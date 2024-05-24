"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerCheckResult = void 0;
const HandlerCheckResult = class {
    constructor(input_descriptor_path, verifiable_credential_path, evaluator, status, message, payload) {
        this.input_descriptor_path = input_descriptor_path;
        this.verifiable_credential_path = verifiable_credential_path;
        this.evaluator = evaluator;
        this.status = status;
        this.message = message;
        this.payload = payload;
    }
};
exports.HandlerCheckResult = HandlerCheckResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlckNoZWNrUmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2V2YWx1YXRpb24vY29yZS9oYW5kbGVyQ2hlY2tSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBWU8sTUFBTSxrQkFBa0IsR0FBRztJQVFoQyxZQUNFLHFCQUE2QixFQUM3QiwwQkFBa0MsRUFDbEMsU0FBaUIsRUFDakIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLE9BQWlCO1FBRWpCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztRQUNuRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsMEJBQTBCLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUM7QUF2QlcsUUFBQSxrQkFBa0Isc0JBdUI3QiJ9