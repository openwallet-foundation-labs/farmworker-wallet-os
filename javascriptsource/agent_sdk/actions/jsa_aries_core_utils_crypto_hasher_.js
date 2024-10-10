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
import { Hasher } from '@credo-ts/core';
import { Buffer } from '@credo-ts/core';
// END EXTRA CODE

/**
 * hash(data: Uint8Array | string, hashName: HashName | string) 
 * 
 * https://github.com/openwallet-foundation/credo-ts/blob/59c7e15259af0d258cb07996d76cc0b2742c88ad/packages/core/src/crypto/hashes/Hasher.ts
 * @param {string} data
 * @param {string} hashName - SHA-256 / SHA-1
 * @param {string} encoding - hex / base64 / utf8
 * @returns {Promise.<string>}
 */
export async function jsa_aries_core_utils_crypto_hasher_(data, hashName, encoding) {
	// BEGIN USER CODE
	try{
		if(data==null)return(Promise.reject("data null"));
		if(hashName==null)return(Promise.reject("hashName null"));
		if(encoding==null)return(Promise.reject("encoding null"));
		try{
			data=Buffer.from(data,encoding)
		}catch(e){
			return(Promise.reject("Failed to convert data to Uint8Array: "+e.toString()));
		}
		return(Promise.resolve(Buffer.from(Hasher.hash(data,hashName)).toString(encoding)));
	}catch(e){
		return(Promise.reject(e.toString()));
	}
	// END USER CODE
}