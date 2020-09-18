import userService from './UserService';
import nock from 'nock'

describe('unit tests of userService', () => {

    it('should create user', () => {
        const user = {
            email:"user@email.com",
            password:"123456789",
            city:"City 1",
            location:{
                logitude:1111,
                latitude:2222
            }
        };
        nock("http://localhost:80")
        .post('/rest-service/sign-up', user)
        .reply(200);

        return userService.signUp(user)
                .then(response => {
                    expect(response).toBeDefined()
                })
    });

    it('should throw an error if the email used to create the account is already used', () => {
            const user = {
                email:"user@email.com",
                password:"123456789",
                city:"City 1",
                location:{
                    logitude:1111,
                    latitude:2222
                }
            };
            nock("http://localhost:80")
            .post('/rest-service/sign-up', user)
            .reply(400, {exceptionMessage:"EMAIL_ALREADY_USED"}, {'Content-Type': 'application/json'});
    
            return userService.signUp(user)
                    .catch(error => {
                       expect(error.content).toBeDefined();
                       return error.content.json().then(responseBody => {
                           expect(responseBody.exceptionMessage).toBeDefined();
                           expect(responseBody.exceptionMessage).toEqual("EMAIL_ALREADY_USED");
                       })
                    })
    })
});