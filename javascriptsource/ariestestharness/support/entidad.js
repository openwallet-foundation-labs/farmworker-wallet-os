const support={
	data:{
		async create(options){
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
	},
};
export default support;
