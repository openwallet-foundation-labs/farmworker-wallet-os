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
//--------------------------------------------------------------------------------
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
let cache={
	put:put,
	get:get,
	remove:remove,
	clear:clear,
	list:list,
	keys:keys
};
export{cache as cache, uuid as uuid};
