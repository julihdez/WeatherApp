// import { currentState, actions, dispatch } from '../store/global';

async function internalServerCall(url){
    const response = await fetch(url);
	const text = await response.text();
    // if (!response.ok) {
	// 	if ((response.status === 401) || (response.status === 403)) {			
	// 		return Promise.reject('Error');
	// 	} else {
	// 		const data = text && JSON.parse(text);
	// 		const error = (data && data.error) || (data && data.message) || response.statusText;
	// 		return Promise.reject(error);
	// 	}
	// }
	const data = text && JSON.parse(text);
	// if ((data.error)||(data.result==='Error')){
    //     return Promise.reject(data.error?data.error:'Error inesperado');
    // }else{
        return Promise.resolve(data);
    // }	
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