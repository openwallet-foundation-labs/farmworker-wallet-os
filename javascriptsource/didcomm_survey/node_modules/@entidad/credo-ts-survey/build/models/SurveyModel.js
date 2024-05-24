"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModel = void 0;
const class_transformer_1 = require("class-transformer");
class SurveyModel {
    constructor(options) {
        if (options) {
            this.surveyId = options.surveyId;
            this.jsonSchema = options.jsonSchema;
            this.uiSchema = options.uiSchema;
            this.initData = options.initData;
            this.i18nData = options.i18nData;
        }
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'survey_id' }),
    __metadata("design:type", String)
], SurveyModel.prototype, "surveyId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'json_schema' }),
    __metadata("design:type", String)
], SurveyModel.prototype, "jsonSchema", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'ui_schema' }),
    __metadata("design:type", String)
], SurveyModel.prototype, "uiSchema", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'init_data' }),
    __metadata("design:type", String)
], SurveyModel.prototype, "initData", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'i18n_data' }),
    __metadata("design:type", String)
], SurveyModel.prototype, "i18nData", void 0);
exports.SurveyModel = SurveyModel;
//# sourceMappingURL=SurveyModel.js.map