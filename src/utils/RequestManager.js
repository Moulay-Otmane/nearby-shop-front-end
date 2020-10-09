export function sendRequest(apiUrl, method, body=null, needsAuthorisation = true){
    const headers = needsAuthorisation ? { 'Content-Type': 'application/json', 'Authorization': 'auth-token '+ localStorage.getItem('token')} : {'Content-Type': 'application/json'};
    
    const requestOptions = {
        method: method,
        headers: headers,
        body: body
    };
    return fetch(apiUrl, requestOptions);
}