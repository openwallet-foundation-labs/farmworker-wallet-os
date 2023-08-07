"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInvitationShortUrl = exports.oobInvitationFromShortUrl = exports.parseInvitationUrl = void 0;
const abort_controller_1 = require("abort-controller");
const query_string_1 = require("query-string");
const error_1 = require("../error");
const connections_1 = require("../modules/connections");
const helpers_1 = require("../modules/oob/helpers");
const messages_1 = require("../modules/oob/messages");
const JsonTransformer_1 = require("./JsonTransformer");
const MessageValidator_1 = require("./MessageValidator");
const messageType_1 = require("./messageType");
const fetchShortUrl = async (invitationUrl, dependencies) => {
    const abortController = new abort_controller_1.AbortController();
    const id = setTimeout(() => abortController.abort(), 15000);
    let response;
    try {
        response = await dependencies.fetch(invitationUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        throw new error_1.AriesFrameworkError(`Get request failed on provided url: ${error.message}`, { cause: error });
    }
    clearTimeout(id);
    return response;
};
/**
 * Parses URL containing encoded invitation and returns invitation message.
 *
 * @param invitationUrl URL containing encoded invitation
 *
 * @returns OutOfBandInvitation
 */
const parseInvitationUrl = (invitationUrl) => {
    const parsedUrl = (0, query_string_1.parseUrl)(invitationUrl).query;
    if (parsedUrl['oob']) {
        const outOfBandInvitation = messages_1.OutOfBandInvitation.fromUrl(invitationUrl);
        return outOfBandInvitation;
    }
    else if (parsedUrl['c_i'] || parsedUrl['d_m']) {
        const invitation = connections_1.ConnectionInvitationMessage.fromUrl(invitationUrl);
        return (0, helpers_1.convertToNewInvitation)(invitation);
    }
    throw new error_1.AriesFrameworkError('InvitationUrl is invalid. It needs to contain one, and only one, of the following parameters: `oob`, `c_i` or `d_m`.');
};
exports.parseInvitationUrl = parseInvitationUrl;
// This currently does not follow the RFC because of issues with fetch, currently uses a janky work around
const oobInvitationFromShortUrl = async (response) => {
    var _a;
    if (response) {
        if (((_a = response.headers.get('Content-Type')) === null || _a === void 0 ? void 0 : _a.startsWith('application/json')) && response.ok) {
            const invitationJson = await response.json();
            const parsedMessageType = (0, messageType_1.parseMessageType)(invitationJson['@type']);
            if ((0, messageType_1.supportsIncomingMessageType)(parsedMessageType, messages_1.OutOfBandInvitation.type)) {
                const invitation = JsonTransformer_1.JsonTransformer.fromJSON(invitationJson, messages_1.OutOfBandInvitation);
                MessageValidator_1.MessageValidator.validateSync(invitation);
                return invitation;
            }
            else if ((0, messageType_1.supportsIncomingMessageType)(parsedMessageType, connections_1.ConnectionInvitationMessage.type)) {
                const invitation = JsonTransformer_1.JsonTransformer.fromJSON(invitationJson, connections_1.ConnectionInvitationMessage);
                MessageValidator_1.MessageValidator.validateSync(invitation);
                return (0, helpers_1.convertToNewInvitation)(invitation);
            }
            else {
                throw new error_1.AriesFrameworkError(`Invitation with '@type' ${parsedMessageType.messageTypeUri} not supported.`);
            }
        }
        else if (response['url']) {
            // The following if else is for here for trinsic shorten urls
            // Because the redirect targets a deep link the automatic redirect does not occur
            let responseUrl;
            const location = response.headers.get('Location');
            if ((response.status === 302 || response.status === 301) && location)
                responseUrl = location;
            else
                responseUrl = response['url'];
            return (0, exports.parseInvitationUrl)(responseUrl);
        }
    }
    throw new error_1.AriesFrameworkError('HTTP request time out or did not receive valid response');
};
exports.oobInvitationFromShortUrl = oobInvitationFromShortUrl;
/**
 * Parses URL containing encoded invitation and returns invitation message. Compatible with
 * parsing short Urls
 *
 * @param invitationUrl URL containing encoded invitation
 *
 * @param dependencies Agent dependencies containing fetch
 *
 * @returns OutOfBandInvitation
 */
const parseInvitationShortUrl = async (invitationUrl, dependencies) => {
    const parsedUrl = (0, query_string_1.parseUrl)(invitationUrl).query;
    if (parsedUrl['oob']) {
        const outOfBandInvitation = messages_1.OutOfBandInvitation.fromUrl(invitationUrl);
        return outOfBandInvitation;
    }
    else if (parsedUrl['c_i'] || parsedUrl['d_m']) {
        const invitation = connections_1.ConnectionInvitationMessage.fromUrl(invitationUrl);
        return (0, helpers_1.convertToNewInvitation)(invitation);
    }
    else {
        try {
            return (0, exports.oobInvitationFromShortUrl)(await fetchShortUrl(invitationUrl, dependencies));
        }
        catch (error) {
            throw new error_1.AriesFrameworkError('InvitationUrl is invalid. It needs to contain one, and only one, of the following parameters: `oob`, `c_i` or `d_m`, or be valid shortened URL');
        }
    }
};
exports.parseInvitationShortUrl = parseInvitationShortUrl;
//# sourceMappingURL=parseInvitation.js.map