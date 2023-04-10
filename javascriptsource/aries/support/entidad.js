import{Logger,LogLevel}from"@aries-framework/core";
class ConsoleLogger/*implements Logger*/{
	/*public*/logLevel:LogLevel

	/*public*/constructor(logLevel:LogLevel=LogLevel.off){
		this.logLevel=logLevel
	}
	/*public*/test(message:string,data?:Record<string,any>):void{
		console.info(mx.session.getUserName()+": "+message,data)
	}
	/*public*/trace(message:string,data?:Record<string,any>):void{
		console.info(mx.session.getUserName()+": "+message,data)
	}
	/*public*/debug(message:string,data?:Record<string,any>):void{
		console.info(mx.session.getUserName()+": "+message,data)
	}
	/*public*/info(message:string,data?:Record<string,any>):void{
		console.info(mx.session.getUserName()+": "+message,data)
	}
	/*public*/warn(message:string,data?:Record<string,any>):void{
		console.warn(mx.session.getUserName()+": "+message,data)
	}
	/*public*/error(message:string,data?:Record<string,any>):void{
		console.error(mx.session.getUserName()+": "+message,data)
	}
	/*public*/fatal(message:string,data?:Record<string,any>):void{
		console.error(mx.session.getUserName()+": "+message,data)
	}
}
let cache={};
function put(value){
	let key=Object.keys(cache).length;
	cache[key]=value;
	return key;
}
function get(key){
	return cache[key];
}
function list(){
	return cache;
}
function keys(){
	return Object.keys(cache);
}
function remove(key){
	if(typeof(cache[key])!="undefined"){
		delete cache(key);
		return true;
	}else{
		return false;
	}
}
function clear(){
	Object.keys(cache).forEach((key)=>{
		delete cache(key);
	});
	return true;
}
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
	logging:{
		ConsoleLogger:ConsoleLogger 
	},
	cache:{
		put:put,
		get:get,
		remove:remove,
		clear:clear,
		list:list,
		keys:keys
	}
};
export default support;
