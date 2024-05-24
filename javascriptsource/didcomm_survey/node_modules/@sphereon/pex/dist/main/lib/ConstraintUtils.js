"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasErrors = exports.Checked = exports.Status = void 0;
exports.Status = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
};
const Checked = class {
    constructor(tag, status, message) {
        this.tag = tag;
        this.status = status;
        this.message = message;
    }
};
exports.Checked = Checked;
const hasErrors = (checked) => {
    function isError(chk) {
        return chk.status === exports.Status.ERROR;
    }
    return checked.filter((chk) => isError(chk)).length > 0;
};
exports.hasErrors = hasErrors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RyYWludFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL0NvbnN0cmFpbnRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLE1BQU0sR0FBRztJQUNwQixJQUFJLEVBQUUsTUFBZ0I7SUFDdEIsSUFBSSxFQUFFLE1BQWdCO0lBQ3RCLEtBQUssRUFBRSxPQUFpQjtDQUN6QixDQUFDO0FBUUssTUFBTSxPQUFPLEdBQUc7SUFLckIsWUFBbUIsR0FBVyxFQUFFLE1BQWMsRUFBRSxPQUFnQjtRQUM5RCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFDO0FBVlcsUUFBQSxPQUFPLFdBVWxCO0FBTUssTUFBTSxTQUFTLEdBQWUsQ0FBQyxPQUFrQixFQUFXLEVBQUU7SUFDbkUsU0FBUyxPQUFPLENBQUMsR0FBWTtRQUMzQixPQUFPLEdBQUcsQ0FBQyxNQUFNLEtBQUssY0FBTSxDQUFDLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBUSxPQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN6RSxDQUFDLENBQUM7QUFOVyxRQUFBLFNBQVMsYUFNcEIifQ==