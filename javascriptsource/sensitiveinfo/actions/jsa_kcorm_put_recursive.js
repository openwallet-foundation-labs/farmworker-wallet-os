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
import {jsa_mxobj2json} from"./jsa_mxobj2json.js";
import {jsa_kcorm_put} from"./jsa_kcorm_put.js";
import{mx_data_get_async,mx_data_createAsync,getReverseReferences}from"../support/entidad.js";
/**
 * Retrieve a set of objects from the reference of a reference set
 * @param {MxObject} referenceObject - This object should be referenced (have the arrow) for the reference set
 * @param {string} referenceName - The name of the reference set, including the module. i.e. MyFirstModule.Person_Pets
 * @param {string} ownerEntity - The owner (dot) of the reference
 * @returns {Promise.<MxObject[]>}
 */
// END EXTRA CODE

/**
 * Test function - Internal Entidad use
 * @param {MxObject} input
 * @param {string} key
 * @returns {Promise.<string>}
 */
export async function jsa_kcorm_put_recursive(input, key) {
	// BEGIN USER CODE
	try{
		let ret=null;
		/*
		window._622c7f200acd11eebf7d0a0027000013=typeof(window._622c7f200acd11eebf7d0a0027000013)=="undefined"?false:window._622c7f200acd11eebf7d0a0027000013;
		if(!window._622c7f200acd11eebf7d0a0027000013){
				window._4694690c0ace11ee8de70a0027000013=mx.data.get;
				mx.data.get=function(){
						console.info(arguments);
						_4694690c0ace11ee8de70a0027000013.apply(this,arguments);
				}
				window._622c7f200acd11eebf7d0a0027000013=true;
		}
		*/
		if(input==null)return Promise.reject("Invalid argument input");
		ret=await jsa_kcorm_put(key,input,null,null,null);
		let refs=input.getReferenceAttributes();
		input.getAttributes().forEach((k)=>{
			if(input.isObjectReference(k)){
				//console.info(k+":"+"object reference");
			}
			if(input.isObjectReferenceSet(k)){
				//console.info(k+":"+"object reference set");
			}
			if(input.isReference(k)){
				//console.info(k+":"+"reference");
			}
		});
		//----------------------------
		//get non reverse association objects
		for(let i=0;i<refs.length;i++){
			let k=refs[i];
			let value=input.get(k);
			let references=input.getReferences(k);
			for(let j=0;j<references.length;j++){
				let o=await mx_data_get_async({guid:references[j]});
				await jsa_kcorm_put(key,o,null,null,null);
			}
		}
		//----------------------------
		//get reverse association objects
		let rrefs=getReverseReferences(input);
		for(let i=0;i<rrefs.length;i++){
			let ref=rrefs[i];
			let refobjs=await mx_data_get_async({"guid":input.getGuid(),"path":ref.reference,"entity":ref.entity,"direction":"reverse"});
			for(var j=0;j<refobjs.length;j++){
				let refobj=refobjs[j];
				await jsa_kcorm_put(key,refobj,null,null,null);
			}
		}
		//----------------------------
		return Promise.resolve(ret);
	}catch(e){
		return Promise.reject(e.toString());
	}
	// END USER CODE
}