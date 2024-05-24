"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEVersion = exports.InternalPresentationDefinitionV2 = exports.InternalPresentationDefinitionV1 = void 0;
class InternalPresentationDefinitionV1 {
    constructor(id, input_descriptors, format, name, purpose, submission_requirements) {
        this.id = id;
        this.input_descriptors = input_descriptors;
        this.format = format;
        this.name = name;
        this.purpose = purpose;
        this.submission_requirements = submission_requirements;
    }
    getVersion() {
        return PEVersion.v1;
    }
}
exports.InternalPresentationDefinitionV1 = InternalPresentationDefinitionV1;
class InternalPresentationDefinitionV2 {
    constructor(id, input_descriptors, format, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frame, name, purpose, submission_requirements) {
        this.format = format;
        this.frame = frame;
        this.id = id;
        this.input_descriptors = input_descriptors;
        this.name = name;
        this.purpose = purpose;
        this.submission_requirements = submission_requirements;
    }
    getVersion() {
        return PEVersion.v2;
    }
}
exports.InternalPresentationDefinitionV2 = InternalPresentationDefinitionV2;
var PEVersion;
(function (PEVersion) {
    PEVersion["v1"] = "v1";
    PEVersion["v2"] = "v2";
})(PEVersion || (exports.PEVersion = PEVersion = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJuYWwudHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdHlwZXMvSW50ZXJuYWwudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBcUJBLE1BQWEsZ0NBQWdDO0lBRzNDLFlBQ0UsRUFBVSxFQUNWLGlCQUEyQyxFQUMzQyxNQUFlLEVBQ2YsSUFBYSxFQUNiLE9BQWdCLEVBQ2hCLHVCQUFzRDtRQUV0RCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7SUFDekQsQ0FBQztJQVFELFVBQVU7UUFDUixPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBNUJELDRFQTRCQztBQUVELE1BQWEsZ0NBQWdDO0lBVTNDLFlBQ0UsRUFBVSxFQUNWLGlCQUEyQyxFQUMzQyxNQUFlO0lBQ2YsOERBQThEO0lBQzlELEtBQVcsRUFDWCxJQUFhLEVBQ2IsT0FBZ0IsRUFDaEIsdUJBQXNEO1FBRXRELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztJQUN6RCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFoQ0QsNEVBZ0NDO0FBa0JELElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNuQixzQkFBUyxDQUFBO0lBQ1Qsc0JBQVMsQ0FBQTtBQUNYLENBQUMsRUFIVyxTQUFTLHlCQUFULFNBQVMsUUFHcEIifQ==