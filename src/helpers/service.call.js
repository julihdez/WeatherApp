

async function internalServerCall(url){
    const response = await fetch(url);
	const text = await response.text();
	const data = text && JSON.parse(text);
	
        return Promise.resolve(data);	
}

export function serverCallGet(url,params){
    var tmp = url;
    if (params){
        tmp = tmp + '?';
        Object.keys(params).forEach((key)=>{
            if (params[key]!=null){
                tmp = tmp + encodeURIComponent(key) + "=" +encodeURIComponent(params[key])+"&";
            }
        });
        tmp = tmp.substring(0,tmp.length-1);
    }    
   
    return internalServerCall(tmp);
}