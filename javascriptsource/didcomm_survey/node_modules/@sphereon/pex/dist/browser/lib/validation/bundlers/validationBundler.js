"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationBundler = void 0;
const ConstraintUtils_1 = require("../../ConstraintUtils");
class ValidationBundler {
    constructor(parentTag, myTag) {
        this.parentTag = parentTag;
        this.myTag = myTag;
    }
    getTag() {
        return this.parentTag != null ? this.parentTag + '.' + this.myTag : this.myTag;
    }
    toChecked(message) {
        return new ConstraintUtils_1.Checked(this.getTag(), ConstraintUtils_1.Status.ERROR, message);
    }
}
exports.ValidationBundler = ValidationBundler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbkJ1bmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy92YWxpZGF0aW9uQnVuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBd0Q7QUFHeEQsTUFBc0IsaUJBQWlCO0lBSXJDLFlBQXNCLFNBQWlCLEVBQUUsS0FBYTtRQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBS1MsTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDakYsQ0FBQztJQUVTLFNBQVMsQ0FBQyxPQUFlO1FBQ2pDLE9BQU8sSUFBSSx5QkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSx3QkFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0Y7QUFuQkQsOENBbUJDIn0=