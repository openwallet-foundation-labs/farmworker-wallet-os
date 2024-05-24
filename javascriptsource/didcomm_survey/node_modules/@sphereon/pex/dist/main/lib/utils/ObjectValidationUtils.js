"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidationUtils = void 0;
class ObjectValidationUtils {
    static optionalNonEmptyString(value) {
        return value == null || value.length > 0;
    }
    static nonEmptyString(value) {
        return value != null && value.length > 0;
    }
    static isValidDIDURI(uri) {
        const pchar = "[a-zA-Z-\\._~]|%[0-9a-fA-F]{2}|[!$&'()*+,;=:@]";
        const format = '^' +
            'did:' +
            '([a-z0-9]+)' + // method_name
            '(:' + // method-specific-id
            '([a-zA-Z0-9\\.\\-_]|%[0-9a-fA-F]{2})+' +
            ')+' +
            '(/(' +
            pchar +
            ')*)?'; // + // path-abempty
        '(\\?(' +
            pchar +
            '|/|\\?)+)?' + // [ "?" query ]
            '(#(' +
            pchar +
            '|/|\\?)+)?'; // [ "#" fragment ]
        ('$');
        return new RegExp(format).test(uri);
    }
}
exports.ObjectValidationUtils = ObjectValidationUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VmFsaWRhdGlvblV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWxzL09iamVjdFZhbGlkYXRpb25VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLHFCQUFxQjtJQUN6QixNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBeUI7UUFDNUQsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQWE7UUFDeEMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQVc7UUFDckMsTUFBTSxLQUFLLEdBQUcsZ0RBQWdELENBQUM7UUFDL0QsTUFBTSxNQUFNLEdBQ1YsR0FBRztZQUNILE1BQU07WUFDTixhQUFhLEdBQUcsY0FBYztZQUM5QixJQUFJLEdBQUcscUJBQXFCO1lBQzVCLHVDQUF1QztZQUN2QyxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNLENBQUMsQ0FBQyxvQkFBb0I7UUFDOUIsT0FBTztZQUNMLEtBQUs7WUFDTCxZQUFZLEdBQUcsZ0JBQWdCO1lBQy9CLEtBQUs7WUFDTCxLQUFLO1lBQ0wsWUFBWSxDQUFDLENBQUMsbUJBQW1CO1FBQ25DLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDTixPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUE5QkQsc0RBOEJDIn0=