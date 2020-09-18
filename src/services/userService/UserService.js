import handleResponse from '../../utils/ResponseHandler'

class UserService{

    signUp(user){
        return this.sendRequest('/rest-service/sign-up', 'post', JSON.stringify(user), false).then(handleResponse)
    }

    sendRequest(apiUrl, method, body=null, needsAuthorisation = true){
        const headers = needsAuthorisation ? { 'Content-Type': 'application/json', 'Authorisation': 'auth-token '+ localStorage.getItem('token')} : {'Content-Type': 'application/json'};
        
        const requestOptions = {
            method: method,
            headers: headers,
            body: body
        };
        return fetch(apiUrl, requestOptions);
    }
}

const userService = new UserService();

export default userService; 