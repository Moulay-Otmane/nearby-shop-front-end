import handleResponse from '../../utils/ResponseHandler';

class AuthenticationService{

    authenticate(loginInformations){
        return this.sendRequest('/rest-service/authenticate','post', JSON.stringify(loginInformations), false)
            .then(handleResponse)
            .then(response => response.json())
    }
    
    checkTokenValidity(){
        const jwtToken = {token:localStorage.getItem('token')}
        return this.sendRequest('/rest-service/check-token-validity', 'post', JSON.stringify(jwtToken))
            .then(handleResponse)
            .then(response => response.json());
    }

    sendRequest(apiUrl, method, body=null, needsAuthorisation = true){
        const headers = needsAuthorisation ? { 'Content-Type': 'application/json', 'Authorization': 'auth-token '+ localStorage.getItem('token')} : {'Content-Type': 'application/json'};
        
        const requestOptions = {
            method: method,
            headers: headers,
            body: body
        };
        return fetch(apiUrl, requestOptions);
    }
}

const authenticationService = new AuthenticationService();

export default authenticationService;