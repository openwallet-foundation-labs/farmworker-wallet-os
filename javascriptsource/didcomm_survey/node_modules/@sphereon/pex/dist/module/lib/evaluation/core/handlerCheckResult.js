export const HandlerCheckResult = class {
    input_descriptor_path;
    verifiable_credential_path;
    evaluator;
    status;
    message;
    payload;
    constructor(input_descriptor_path, verifiable_credential_path, evaluator, status, message, payload) {
        this.input_descriptor_path = input_descriptor_path;
        this.verifiable_credential_path = verifiable_credential_path;
        this.evaluator = evaluator;
        this.status = status;
        this.message = message;
        this.payload = payload;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlckNoZWNrUmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2V2YWx1YXRpb24vY29yZS9oYW5kbGVyQ2hlY2tSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUc7SUFDekIscUJBQXFCLENBQVM7SUFDOUIsMEJBQTBCLENBQVM7SUFDbkMsU0FBUyxDQUFTO0lBQ2xCLE1BQU0sQ0FBUztJQUNmLE9BQU8sQ0FBVTtJQUNqQixPQUFPLENBQVc7SUFFekIsWUFDRSxxQkFBNkIsRUFDN0IsMEJBQWtDLEVBQ2xDLFNBQWlCLEVBQ2pCLE1BQWMsRUFDZCxPQUFnQixFQUNoQixPQUFpQjtRQUVqQixJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDbkQsSUFBSSxDQUFDLDBCQUEwQixHQUFHLDBCQUEwQixDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFDIn0=