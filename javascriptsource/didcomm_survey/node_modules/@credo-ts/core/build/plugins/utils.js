"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiForModuleByName = exports.getRegisteredModuleByName = exports.getRegisteredModuleByInstance = void 0;
function getRegisteredModuleByInstance(agentContext, moduleType) {
    const module = Object.values(agentContext.dependencyManager.registeredModules).find((module) => module instanceof moduleType);
    return module;
}
exports.getRegisteredModuleByInstance = getRegisteredModuleByInstance;
function getRegisteredModuleByName(agentContext, constructorName) {
    const module = Object.values(agentContext.dependencyManager.registeredModules).find((module) => module.constructor.name === constructorName);
    return module;
}
exports.getRegisteredModuleByName = getRegisteredModuleByName;
function getApiForModuleByName(agentContext, constructorName) {
    const module = getRegisteredModuleByName(agentContext, constructorName);
    if (!module || !module.api)
        return undefined;
    return agentContext.dependencyManager.resolve(module.api);
}
exports.getApiForModuleByName = getApiForModuleByName;
//# sourceMappingURL=utils.js.map