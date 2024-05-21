//--------------------------------------------------------------------------------
//import{Logger,LogLevel}from"@aries-framework/core";
import{Logger,LogLevel}from"@credo-ts/core";
class ConsoleLogger{
	logLevel:LogLevel

	constructor(logLevel:LogLevel=LogLevel.off,label){
		this.logLevel=logLevel
		this.label=label;
	}
	test(message:string,data?:Record<string,any>):void{
		console.info("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
	trace(message:string,data?:Record<string,any>):void{
		console.info("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
	debug(message:string,data?:Record<string,any>):void{
		console.info("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
	info(message:string,data?:Record<string,any>):void{
		console.info("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
	warn(message:string,data?:Record<string,any>):void{
		console.warn("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
	error(message:string,data?:Record<string,any>):void{
		console.error("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
	fatal(message:string,data?:Record<string,any>):void{
		console.error("afj:"+mx.session.getUserName()+":"+this.label+": "+message,data)
	}
}
function uuid(){
	//https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
	let d=new Date().getTime();
	let d2=((typeof performance!=="undefined")&&performance.now&&(performance.now()*1000))||0;
	return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){
		let r=Math.random()*16;
		if(d>0){
			r=(d+r)%16|0;
			d=Math.floor(d/16);
		}else{
			r=(d2+r)%16|0;
			d2=Math.floor(d2/16);
		}
		return(c==="x"?r:(r&0x3|0x8)).toString(16);
	});
}
let cache={};
function put(value,key){
	key=typeof(key)=="undefined"?uuid():key;
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
		delete cache[key];
		//cache[key]==null;//?handle for future shutdown operations lost?
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
