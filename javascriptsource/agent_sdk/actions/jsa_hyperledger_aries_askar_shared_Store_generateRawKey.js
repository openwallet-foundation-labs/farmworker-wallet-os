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
import { Key } from '@hyperledger/aries-askar-react-native';//needed otherwise undefined raised at runtime
import{Store} from '@hyperledger/aries-askar-shared'
import { Buffer } from '@credo-ts/core';
// END EXTRA CODE

/**
 * Store.generateRawKey(seed?: Uint8Array): string
 * 
 * https://github.com/hyperledger/aries-askar/blob/3a4d5044b01d529e77b788cbe08313d0c7b758e6/wrappers/javascript/packages/aries-askar-shared/src/store/Store.ts#L23
 * @param {string} seed - optional json array
 * @param {string} encoding - hex / base64 / utf8
 * @returns {Promise.<string>}
 */
export async function jsa_hyperledger_aries_askar_shared_Store_generateRawKey(seed, encoding) {
	// BEGIN USER CODE
	try{
		if(encoding==null)return(Promise.reject("encoding null"));
		let ret=null;
		if(seed!=null&&seed.length>0){
			//try{
			//	seed=JSON.parse(seed);
			//}catch(e){
			//	return(Promise.reject("Failed to parse seed: "+e.toString()));
			//}
			//seed=Uint8Array.from(seed);
			seed=Buffer.from(seed,encoding)
			ret=Store.generateRawKey(seed);
		}else{
			ret=Store.generateRawKey();
		}
		return(Promise.resolve(ret));
	}catch(e){
		return(Promise.reject(e.toString()));
	}
	// END USER CODE
}