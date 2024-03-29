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
exports.DefaultAgentContextProvider = void 0;
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
const AgentContext_1 = require("./AgentContext");
/**
 * Default implementation of AgentContextProvider.
 *
 * Holds a single `AgentContext` instance that will be used for all messages, i.e. a
 * a single tenant agent.
 */
let DefaultAgentContextProvider = class DefaultAgentContextProvider {
    constructor(agentContext) {
        this.agentContext = agentContext;
    }
    async getAgentContextForContextCorrelationId(contextCorrelationId) {
        if (contextCorrelationId !== this.agentContext.contextCorrelationId) {
            throw new error_1.AriesFrameworkError(`Could not get agent context for contextCorrelationId '${contextCorrelationId}'. Only contextCorrelationId '${this.agentContext.contextCorrelationId}' is supported.`);
        }
        return this.agentContext;
    }
    async getContextForInboundMessage(
    // We don't need to look at the message as we always use the same context in the default agent context provider
    _, options) {
        // This will throw an error if the contextCorrelationId does not match with the contextCorrelationId of the agent context property of this class.
        if (options === null || options === void 0 ? void 0 : options.contextCorrelationId) {
            return this.getAgentContextForContextCorrelationId(options.contextCorrelationId);
        }
        return this.agentContext;
    }
    async endSessionForAgentContext(agentContext) {
        // Throw an error if the context correlation id does not match to prevent misuse.
        if (agentContext.contextCorrelationId !== this.agentContext.contextCorrelationId) {
            throw new error_1.AriesFrameworkError(`Could not end session for agent context with contextCorrelationId '${agentContext.contextCorrelationId}'. Only contextCorrelationId '${this.agentContext.contextCorrelationId}' is provided by this provider.`);
        }
        // We won't dispose the agent context as we don't keep track of the total number of sessions for the root agent context.65
    }
};
DefaultAgentContextProvider = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [AgentContext_1.AgentContext])
], DefaultAgentContextProvider);
exports.DefaultAgentContextProvider = DefaultAgentContextProvider;
//# sourceMappingURL=DefaultAgentContextProvider.js.map