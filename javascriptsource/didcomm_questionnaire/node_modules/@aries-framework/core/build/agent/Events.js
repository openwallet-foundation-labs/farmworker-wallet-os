"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentEventTypes = exports.filterContextCorrelationId = void 0;
const rxjs_1 = require("rxjs");
function filterContextCorrelationId(contextCorrelationId) {
    return (source) => {
        return source.pipe((0, rxjs_1.filter)((event) => event.metadata.contextCorrelationId === contextCorrelationId));
    };
}
exports.filterContextCorrelationId = filterContextCorrelationId;
var AgentEventTypes;
(function (AgentEventTypes) {
    AgentEventTypes["AgentMessageReceived"] = "AgentMessageReceived";
    AgentEventTypes["AgentMessageProcessed"] = "AgentMessageProcessed";
    AgentEventTypes["AgentMessageSent"] = "AgentMessageSent";
})(AgentEventTypes = exports.AgentEventTypes || (exports.AgentEventTypes = {}));
//# sourceMappingURL=Events.js.map