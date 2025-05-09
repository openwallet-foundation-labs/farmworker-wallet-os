// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE
import "../shim.js";
import {
	ConnectionEventTypes,
	AgentEventTypes,
	BasicMessageEventTypes,
	CredentialEventTypes,
	ProofEventTypes,
	DidExchangeState
} from '@credo-ts/core';
import support from "../support/entidad";
function findKey(k, o) {
	let ret = null;
	let keys = Object.keys(o);
	for (let i = 0; i < keys.length; i++) {
		if (ret != null) break;
		let ok = keys[i];
		if (ok == k) {
			ret = (o[ok]);
		} else if (typeof (o[ok]) == "object") {
			ret = findKey(k, o[ok]);
		}
	}
	return ret;
}
// END EXTRA CODE

/**
 * Registers a message handler
 * 
 * Sets up a connection listener for a specific event type
 * 
 * @param agent_key local agent instance lookup key
 * @param eventType type of event to trigger callback on
 * @param messageType message type to trigger on, e.g. 'https://didcomm.org/basicmessage/1.0/message' or '*' to trigger on all message types
 * @param callback nanoflow to trigger
 * @param payloadParameterName payload parameter name, defaults to 'payload'
 * @param userDataParameterName custom user data parameter name, optional
 * @param userData custom user data parameter value, usually the Agent
 * @param eventTypeParameterName event type parameter name, will pass in the event type, optional. Internally this action will attempt to find the '@type' of the message and populate the argument with the value if found. Not all message types have the '@type' specified, and in those cases it will be empty
 * @param {string} agent_key
 * @param {"Agent_SDK.enum_aries_EventType.ConnectionStateChanged"|"Agent_SDK.enum_aries_EventType.BasicMessageStateChanged"|"Agent_SDK.enum_aries_EventType.CredentialStateChanged"|"Agent_SDK.enum_aries_EventType.RevocationNotificationReceived"|"Agent_SDK.enum_aries_EventType.ProofStateChanged"|"Agent_SDK.enum_aries_EventType.AgentMessageReceived"|"Agent_SDK.enum_aries_EventType.AgentMessageProcessed"|"Agent_SDK.enum_aries_EventType.AgentMessageSent"} eventType
 * @param {string} messageType
 * @param {Nanoflow} callback
 * @param {string} payloadParameterName - optional
 * @param {string} userDataParameterName - optional
 * @param {MxObject} userData - optional
 * @param {string} eventTypeParameterName - optional
 * @returns {Promise.<void>}
 */
export async function jsa_aries_agent_events_setupConnectionListener(agent_key, eventType, messageType, callback, payloadParameterName, userDataParameterName, userData, eventTypeParameterName) {
	// BEGIN USER CODE
	try {
		if (agent_key == null) return Promise.reject("Invalid agent_key parameter");										//mandatory
		if (callback == null) return Promise.reject("Invalid callback parameter");											//mandatory
		let _eventType = eventType;
		switch (eventType) {
			case "AgentMessageProcessed":
				eventType = AgentEventTypes.AgentMessageProcessed;
				break;
			case "AgentMessageReceived":
				eventType = AgentEventTypes.AgentMessageReceived;
				break;
			case "AgentMessageSent":
				eventType = AgentEventTypes.AgentMessageSent;
				break;
			case "ConnectionStateChanged":
				eventType = ConnectionEventTypes.ConnectionStateChanged;
				break;
			case "BasicMessageStateChanged":
				eventType = BasicMessageEventTypes.BasicMessageStateChanged;
				break;
			case "CredentialStateChanged":
				eventType = CredentialEventTypes.CredentialStateChanged;
				break;
			case "RevocationNotificationReceived":
				eventType = CredentialEventTypes.RevocationNotificationReceived;
				break;
			case "ProofStateChanged":
				eventType = ProofEventTypes.ProofStateChanged;
				break;
			default:
				return Promise.reject("Invalid connectionEventType parameter")
		}
		let agent = support.cache.get(agent_key);
		if (agent == null) return Promise.reject("Agent not found in cache");
		
		agent.events.on(eventType, async function ({ payload }) {
			let currentMessageType = findKey("type", payload);
			if (messageType == '*' || currentMessageType == messageType) {
				let args = {};
				if (payloadParameterName != null) args[payloadParameterName] = JSON.stringify(payload, 0, 2);
				if (userDataParameterName != null) args[userDataParameterName] = userData;
				await callback.call(window, args);
			}
		});
		return Promise.resolve();
	} catch (e) {
		return Promise.reject(e.toString());
	}
	// END USER CODE
}
