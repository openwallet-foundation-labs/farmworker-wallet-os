export class ObjectValidationUtils {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VmFsaWRhdGlvblV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWxzL09iamVjdFZhbGlkYXRpb25VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8scUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUF5QjtRQUM1RCxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUN4QyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVztRQUNyQyxNQUFNLEtBQUssR0FBRyxnREFBZ0QsQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FDVixHQUFHO1lBQ0gsTUFBTTtZQUNOLGFBQWEsR0FBRyxjQUFjO1lBQzlCLElBQUksR0FBRyxxQkFBcUI7WUFDNUIsdUNBQXVDO1lBQ3ZDLElBQUk7WUFDSixLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQjtRQUM5QixPQUFPO1lBQ0wsS0FBSztZQUNMLFlBQVksR0FBRyxnQkFBZ0I7WUFDL0IsS0FBSztZQUNMLEtBQUs7WUFDTCxZQUFZLENBQUMsQ0FBQyxtQkFBbUI7UUFDbkMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNOLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDRiJ9