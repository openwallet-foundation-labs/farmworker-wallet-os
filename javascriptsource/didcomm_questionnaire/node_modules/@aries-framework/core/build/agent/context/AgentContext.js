"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentContext = void 0;
const constants_1 = require("../../constants");
const AgentConfig_1 = require("../AgentConfig");
class AgentContext {
    constructor({ dependencyManager, contextCorrelationId, }) {
        this.dependencyManager = dependencyManager;
        this.contextCorrelationId = contextCorrelationId;
    }
    /**
     * Convenience method to access the agent config for the current context.
     */
    get config() {
        return this.dependencyManager.resolve(AgentConfig_1.AgentConfig);
    }
    /**
     * Convenience method to access the wallet for the current context.
     */
    get wallet() {
        return this.dependencyManager.resolve(constants_1.InjectionSymbols.Wallet);
    }
    /**
     * End session the current agent context
     */
    async endSession() {
        const agentContextProvider = this.dependencyManager.resolve(constants_1.InjectionSymbols.AgentContextProvider);
        await agentContextProvider.endSessionForAgentContext(this);
    }
    toJSON() {
        return {
            contextCorrelationId: this.contextCorrelationId,
        };
    }
}
exports.AgentContext = AgentContext;
//# sourceMappingURL=AgentContext.js.map