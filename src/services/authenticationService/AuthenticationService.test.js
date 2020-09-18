import nock from 'nock';
import authenticationService from './AuthenticationService';
import { jwtToken } from '../../utils/FixturesConstructors';
describe('unit tests of authentication service', () => {

    it('should authenticate when login informations are correct', () => {
        const loginInformation = {
            email: 'user@email.com',
            password: '12345678'
        }
        const token = jwtToken();
        nock("http://localhost:80")
            .post('/rest-service/authenticate', loginInformation)
            .reply(200, token, {'Content-Type': 'application/json'});

        return authenticationService.authenticate(loginInformation)
                .then(receivedToken => {
                        expect(receivedToken.token).toBeDefined();
                        expect(receivedToken.token).toEqual(token.token)
                });
    });

    it('should not authenticate if login informations are not correct', () => {
        const loginInformation = {
            email: 'user@email.com',
            password: 'incorrectPassword'
        }

        nock("http://localhost:80")
            .post('/rest-service/authenticate', loginInformation)
            .reply(404, "", {'Content-Type': 'application/json'});

        return authenticationService.authenticate(loginInformation)
                .catch(error => {
                    expect(error.content).toBeDefined();
                    expect(error.content.status).toEqual(404);
                });
    });

    it('should check token validity', () => {

        const token = jwtToken();
        nock("http://localhost:80")
            .post('/rest-service/check-token-validity')
            .reply(200, true, {'Content-Type': 'application/json'});

        return authenticationService.checkTokenValidity()
                .then( isTokenValid => {
                        expect(isTokenValid).toBeDefined();
                        expect(isTokenValid).toEqual(true)
                })
    });
    
});