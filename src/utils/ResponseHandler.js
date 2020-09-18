import history from './history'

export default function handleResponse (response) {
    if(response.status >= 200 && response.status <300){
        return response;
    }else if( response.status === 401){
        
        history.push("/")
    }else{
        let error = new Error();
        error.content = response; 
        throw error;
    }
}