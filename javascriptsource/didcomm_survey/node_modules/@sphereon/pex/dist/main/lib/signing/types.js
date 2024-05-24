"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEncoding = exports.PresentationSubmissionLocation = void 0;
/**
 * The location of the presentation submission. Can be external or part of the VP
 */
var PresentationSubmissionLocation;
(function (PresentationSubmissionLocation) {
    PresentationSubmissionLocation[PresentationSubmissionLocation["EXTERNAL"] = 0] = "EXTERNAL";
    PresentationSubmissionLocation[PresentationSubmissionLocation["PRESENTATION"] = 1] = "PRESENTATION";
})(PresentationSubmissionLocation || (exports.PresentationSubmissionLocation = PresentationSubmissionLocation = {}));
var KeyEncoding;
(function (KeyEncoding) {
    KeyEncoding["Jwk"] = "Jwk";
    KeyEncoding["Base58"] = "Base58";
    KeyEncoding["Hex"] = "Hex";
    KeyEncoding["Multibase"] = "Multibase";
})(KeyEncoding || (exports.KeyEncoding = KeyEncoding = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvc2lnbmluZy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUE4RUE7O0dBRUc7QUFDSCxJQUFZLDhCQUdYO0FBSEQsV0FBWSw4QkFBOEI7SUFDeEMsMkZBQVEsQ0FBQTtJQUNSLG1HQUFZLENBQUE7QUFDZCxDQUFDLEVBSFcsOEJBQThCLDhDQUE5Qiw4QkFBOEIsUUFHekM7QUFzSUQsSUFBWSxXQUtYO0FBTEQsV0FBWSxXQUFXO0lBQ3JCLDBCQUFXLENBQUE7SUFDWCxnQ0FBaUIsQ0FBQTtJQUNqQiwwQkFBVyxDQUFBO0lBQ1gsc0NBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUxXLFdBQVcsMkJBQVgsV0FBVyxRQUt0QiJ9