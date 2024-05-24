"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEngine = void 0;
const index_1 = require("./index");
class ValidationEngine {
    validate(validators) {
        let validations = [];
        for (const validator of validators) {
            validations = validations.concat(validator.bundler.getValidations(validator.target));
        }
        return (0, index_1.validate)(validations);
    }
}
exports.ValidationEngine = ValidationEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbkVuZ2luZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2NvcmUvdmFsaWRhdGlvbkVuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBMEQ7QUFPMUQsTUFBYSxnQkFBZ0I7SUFDM0IsUUFBUSxDQUFDLFVBQTBCO1FBQ2pDLElBQUksV0FBVyxHQUFvQixFQUFFLENBQUM7UUFFdEMsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNuQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBRUQsT0FBTyxJQUFBLGdCQUFRLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBVkQsNENBVUMifQ==