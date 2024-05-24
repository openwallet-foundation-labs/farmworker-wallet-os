export class InternalPresentationDefinitionV1 {
    input_descriptors;
    constructor(id, input_descriptors, format, name, purpose, submission_requirements) {
        this.id = id;
        this.input_descriptors = input_descriptors;
        this.format = format;
        this.name = name;
        this.purpose = purpose;
        this.submission_requirements = submission_requirements;
    }
    format;
    id;
    name;
    purpose;
    submission_requirements;
    getVersion() {
        return PEVersion.v1;
    }
}
export class InternalPresentationDefinitionV2 {
    format;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frame;
    id;
    input_descriptors;
    name;
    purpose;
    submission_requirements;
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
export var PEVersion;
(function (PEVersion) {
    PEVersion["v1"] = "v1";
    PEVersion["v2"] = "v2";
})(PEVersion || (PEVersion = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJuYWwudHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdHlwZXMvSW50ZXJuYWwudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUJBLE1BQU0sT0FBTyxnQ0FBZ0M7SUFDM0MsaUJBQWlCLENBQTJCO0lBRTVDLFlBQ0UsRUFBVSxFQUNWLGlCQUEyQyxFQUMzQyxNQUFlLEVBQ2YsSUFBYSxFQUNiLE9BQWdCLEVBQ2hCLHVCQUFzRDtRQUV0RCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7SUFDekQsQ0FBQztJQUVELE1BQU0sQ0FBc0I7SUFDNUIsRUFBRSxDQUFTO0lBQ1gsSUFBSSxDQUFzQjtJQUMxQixPQUFPLENBQXNCO0lBQzdCLHVCQUF1QixDQUF1QztJQUU5RCxVQUFVO1FBQ1IsT0FBTyxTQUFTLENBQUMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxnQ0FBZ0M7SUFDM0MsTUFBTSxDQUFVO0lBQ2hCLDhEQUE4RDtJQUM5RCxLQUFLLENBQU87SUFDWixFQUFFLENBQVM7SUFDWCxpQkFBaUIsQ0FBMkI7SUFDNUMsSUFBSSxDQUFVO0lBQ2QsT0FBTyxDQUFVO0lBQ2pCLHVCQUF1QixDQUFnQztJQUV2RCxZQUNFLEVBQVUsRUFDVixpQkFBMkMsRUFDM0MsTUFBZTtJQUNmLDhEQUE4RDtJQUM5RCxLQUFXLEVBQ1gsSUFBYSxFQUNiLE9BQWdCLEVBQ2hCLHVCQUFzRDtRQUV0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7SUFDekQsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBa0JELE1BQU0sQ0FBTixJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDbkIsc0JBQVMsQ0FBQTtJQUNULHNCQUFTLENBQUE7QUFDWCxDQUFDLEVBSFcsU0FBUyxLQUFULFNBQVMsUUFHcEIifQ==