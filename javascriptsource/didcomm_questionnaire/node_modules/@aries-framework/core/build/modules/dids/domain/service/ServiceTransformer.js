"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTransformer = exports.serviceTypes = void 0;
const class_transformer_1 = require("class-transformer");
const DidCommV1Service_1 = require("./DidCommV1Service");
const DidCommV2Service_1 = require("./DidCommV2Service");
const DidDocumentService_1 = require("./DidDocumentService");
const IndyAgentService_1 = require("./IndyAgentService");
exports.serviceTypes = {
    [IndyAgentService_1.IndyAgentService.type]: IndyAgentService_1.IndyAgentService,
    [DidCommV1Service_1.DidCommV1Service.type]: DidCommV1Service_1.DidCommV1Service,
    [DidCommV2Service_1.DidCommV2Service.type]: DidCommV2Service_1.DidCommV2Service,
};
/**
 * Decorator that transforms service json to corresponding class instances. See {@link serviceTypes}
 *
 * @example
 * class Example {
 *   ServiceTransformer()
 *   private service: Service
 * }
 */
function ServiceTransformer() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        return value === null || value === void 0 ? void 0 : value.map((serviceJson) => {
            var _a;
            const serviceClass = ((_a = exports.serviceTypes[serviceJson.type]) !== null && _a !== void 0 ? _a : DidDocumentService_1.DidDocumentService);
            const service = (0, class_transformer_1.plainToInstance)(serviceClass, serviceJson);
            return service;
        });
    }, {
        toClassOnly: true,
    });
}
exports.ServiceTransformer = ServiceTransformer;
//# sourceMappingURL=ServiceTransformer.js.map