export async function mx_data_createAsync(options){
	return new Promise((resolve,reject)=>{
		try{
			mx.data.create(
				{
					entity:options.entity,
					callback:(obj)=>{
						resolve(obj);
					},
					error:(e)=>{
						reject(e);
					}
				}
			);
		}catch(e){
			reject(e);
		}
	});
}
export function getReverseReferences(mxobj){
	let entityType=mxobj.getEntity();
	let reverseReferences=[];
	Object.keys(mx.meta.getMap()).forEach((k)=>{
		let entity=mx.meta.getMap()[k];
		let referenceAttributes=entity.getReferenceAttributes();
		referenceAttributes.forEach((referenceAttribute)=>{
			let selectorEntity=entity.getSelectorEntity(referenceAttribute)
			if(selectorEntity==entityType){
				let referenceType=[];
				if(entity.isObjectReference(referenceAttribute)){
					referenceType.push("ObjectReference");
				}
				if(entity.isObjectReferenceSet(referenceAttribute)){
					referenceType.push("ObjectReferenceSet");					
				}
				reverseReferences.push({
					entity:entity.getEntity(),
					reference:referenceAttribute,
					referenceType:referenceType
				});
			}
		});
	});
	return(reverseReferences);
}
export async function mx_data_get_async(options){
	return new Promise((resolve,reject)=>{
		try{
			if(typeof(options)!="object")reject("invalid arguments");
			options.callback=(r)=>{
				resolve(r);
			};
			options.error=(e)=>{
				reject(e);
			}
			mx.data.get(options);
		}catch(e){
			reject(e);
		}
	});
}
