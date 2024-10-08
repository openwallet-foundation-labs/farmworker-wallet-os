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
import support from"../support/entidad";
// END EXTRA CODE

/**
 * @param {string} key
 * @returns {Promise.<string>}
 */
export async function jsa_cache_get(key) {
	// BEGIN USER CODE
	try{
		let ret=support.cache.get(key);
		switch(typeof(ret)){
			case"string":
				break;
			case"object":
				ret=JSON.stringify(ret);
				break;
			case"undefined":
				ret=null;
				break;
			case"number":
				ret=ret.toString();
				break;
			case"boolean":
				ret=ret?"true":"false";
				break;
			default:
				return Promise.reject("Unserializable value");
		}
		return Promise.resolve(ret);
	}catch(e){
		return Promise.reject(e.toString());
	}
	// END USER CODE
}
