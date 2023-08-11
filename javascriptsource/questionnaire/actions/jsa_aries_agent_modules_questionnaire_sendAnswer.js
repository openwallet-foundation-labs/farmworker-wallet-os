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
import support from"../../../javascriptsource/aries_sdk/support/entidad";
// END EXTRA CODE

/**
 * @param {string} agent_key
 * @param {string} questionnaireRecordId
 * @param {string} response
 * @returns {Promise.<string>}
 */
export async function jsa_aries_agent_modules_questionnaire_sendAnswer(agent_key, questionnaireRecordId, response) {
	// BEGIN USER CODE
	try{
		if(agent_key==null)return Promise.reject("Invalid agent_key parameter");
		if(questionnaireRecordId==null)return Promise.reject("Invalid questionnaireRecordId parameter");
		if(response==null)return Promise.reject("Invalid response parameter");
		try{
			response=JSON.parse(response);
		}catch(e){

			return Promise.reject("Invalid response parameter, not a valid JSON: "+e.toString());
		}
		let agent=support.cache.get(agent_key);
		if(agent==null)return Promise.reject("Agent not found in cache");
		return Promise.resolve(JSON.stringify(
			await agent.modules.questionnaire.sendAnswer(questionnaireRecordId,response)
		));
	}catch(e){
		return Promise.reject(e.toString());
	}
	// END USER CODE
}