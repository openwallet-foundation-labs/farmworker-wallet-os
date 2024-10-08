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
import{
	DEFAULT_DIDCOMM_SERVICE_UUID,
	DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
	DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID
}from"../../agent_sdk/node_modules/@animo-id/react-native-ble-didcomm";
import{cache}from"../support/entidad";
// END EXTRA CODE

/**
 * (method) Peripheral.setService(options: ServiceOptions): Promise<void>
 * 
 * export type ServiceOptions = {
 *   serviceUUID: string
 *   messagingUUID: string
 *   indicationUUID: string
 * }
 * @param {string} serviceUUID - optional
 * @param {string} messagingUUID - optional
 * @param {string} indicationUUID - optional
 * @returns {Promise.<void>}
 */
export async function jsa_animo_ble_peripheral_setService(serviceUUID, messagingUUID, indicationUUID) {
	// BEGIN USER CODE
	try{
		if(serviceUUID==null)serviceUUID=DEFAULT_DIDCOMM_SERVICE_UUID;
		if(messagingUUID==null)messagingUUID=DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID;
		if(indicationUUID==null)indicationUUID=DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID;
		let peripheral=cache.get("peripheral");
		if(peripheral==null)return(Promise.reject("Peripheral not found in cache"));
		let options={
			serviceUUID:serviceUUID,
			messagingUUID:messagingUUID,
			indicationUUID:indicationUUID
		}
		await peripheral.setService(options);
		return Promise.resolve();
	}catch(e){
		return Promise.reject(e.toString());
	}
	// END USER CODE
}
