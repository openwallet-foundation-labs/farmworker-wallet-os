"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToOldInvitation = exports.convertToNewInvitation = void 0;
const connections_1 = require("../connections");
const helpers_1 = require("../dids/helpers");
const OutOfBandDidCommService_1 = require("./domain/OutOfBandDidCommService");
const messages_1 = require("./messages");
function convertToNewInvitation(oldInvitation) {
    var _a, _b;
    let service;
    if (oldInvitation.did) {
        service = oldInvitation.did;
    }
    else if (oldInvitation.serviceEndpoint && oldInvitation.recipientKeys && oldInvitation.recipientKeys.length > 0) {
        service = new OutOfBandDidCommService_1.OutOfBandDidCommService({
            id: '#inline',
            recipientKeys: (_a = oldInvitation.recipientKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.verkeyToDidKey),
            routingKeys: (_b = oldInvitation.routingKeys) === null || _b === void 0 ? void 0 : _b.map(helpers_1.verkeyToDidKey),
            serviceEndpoint: oldInvitation.serviceEndpoint,
        });
    }
    else {
        throw new Error('Missing required serviceEndpoint, routingKeys and/or did fields in connection invitation');
    }
    const options = {
        id: oldInvitation.id,
        label: oldInvitation.label,
        imageUrl: oldInvitation.imageUrl,
        appendedAttachments: oldInvitation.appendedAttachments,
        accept: ['didcomm/aip1', 'didcomm/aip2;env=rfc19'],
        services: [service],
        handshakeProtocols: [connections_1.HandshakeProtocol.Connections],
    };
    return new messages_1.OutOfBandInvitation(options);
}
exports.convertToNewInvitation = convertToNewInvitation;
function convertToOldInvitation(newInvitation) {
    var _a;
    // Taking first service, as we can only include one service in a legacy invitation.
    const [service] = newInvitation.getServices();
    let options;
    if (typeof service === 'string') {
        options = {
            id: newInvitation.id,
            label: newInvitation.label,
            did: service,
            imageUrl: newInvitation.imageUrl,
            appendedAttachments: newInvitation.appendedAttachments,
        };
    }
    else {
        options = {
            id: newInvitation.id,
            label: newInvitation.label,
            recipientKeys: service.recipientKeys.map(helpers_1.didKeyToVerkey),
            routingKeys: (_a = service.routingKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.didKeyToVerkey),
            serviceEndpoint: service.serviceEndpoint,
            imageUrl: newInvitation.imageUrl,
            appendedAttachments: newInvitation.appendedAttachments,
        };
    }
    const connectionInvitationMessage = new connections_1.ConnectionInvitationMessage(options);
    return connectionInvitationMessage;
}
exports.convertToOldInvitation = convertToOldInvitation;
//# sourceMappingURL=helpers.js.map