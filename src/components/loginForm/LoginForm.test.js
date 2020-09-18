import { shallow } from 'enzyme';
import React from 'react';
import authenticationService from '../../services/authenticationService/AuthenticationService';
import LoginForm from './LoginForm';
import { resolvedHttpResponse, jwtToken, rejectedHttpResponse } from '../../utils/FixturesConstructors'

describe('unit tests of the component LoginForm',() => {

    it('should render LoginForm', () => {
        const history = { };
        const wrapper = shallow(<LoginForm history={ history }/>)
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(false);
        expect(wrapper.find('Form FormControl').length).toEqual(2);
        expect(wrapper.find('Form').exists()).toEqual(true);
        expect(wrapper.find({'name':'email'}).exists()).toEqual(true);
        expect(wrapper.find({'name':'password'}).exists()).toEqual(true);
        expect(wrapper.find('Form Button').exists()).toEqual(true);
        
    });

    it('should authenticate when login informations are correct', async () => {
        const history = { 
            push: jest.fn()
        };
        const loginInformations = {
            email:"user@gmail.com",
            password:"12345678"
        };
        const okAuthenticationHttpResponse = resolvedHttpResponse(jwtToken());
        const authenticate = jest.spyOn(authenticationService, 'authenticate').mockImplementationOnce(()=> okAuthenticationHttpResponse)
        const wrapper = shallow(<LoginForm history={ history }/>);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(false);
        wrapper.find({'name':'email'}).simulate('change', {target : { value: loginInformations.email}});
        wrapper.find({'name':'password'}).simulate('change', {target: { value: loginInformations.password}});
        expect(wrapper.state('email')).toEqual(loginInformations.email);
        expect(wrapper.state('password')).toEqual(loginInformations.password);
        await wrapper.find('Form').simulate('submit',{preventDefault:()=>{}});
        expect(authenticate).toHaveBeenCalledWith(loginInformations);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(false);
        expect(localStorage.length).toEqual(1);
        expect(history.push).toHaveBeenCalledWith("/shops");
        localStorage.clear();
        jest.resetAllMocks();
    });



    it('should not authenticate when username is not valid', async () => {
        const history = { 
            push: jest.fn()
        };
        const loginInformations = {
            email:"user@.com",
            password:"12345678"
        };
        const okAuthenticationHttpResponse = resolvedHttpResponse(jwtToken());
        const authenticate = jest.spyOn(authenticationService, 'authenticate').mockImplementationOnce(()=> okAuthenticationHttpResponse)
        const wrapper = shallow(<LoginForm history={ history }/>);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(false);
        wrapper.find({'name':'email'}).simulate('change', {target : { value: loginInformations.email}});
        wrapper.find({'name':'password'}).simulate('change', {target: { value: loginInformations.password}});
        expect(wrapper.state('email')).toEqual(loginInformations.email);
        expect(wrapper.state('password')).toEqual(loginInformations.password);
        await wrapper.find('Form').simulate('submit',{preventDefault:()=>{}});
        expect(authenticate).not.toHaveBeenCalledWith(loginInformations);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(true);
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(localStorage.__STORE__).toEqual({});
        localStorage.clear();
        jest.resetAllMocks();
    });

    it('should not authenticate when password is not valid', async () => {
        const history = { 
            push: jest.fn()
        };
        const loginInformations = {
            email:"user@gmail.com",
            password:"1234"
        };
        const okAuthenticationHttpResponse = resolvedHttpResponse(jwtToken());
        const authenticate = jest.spyOn(authenticationService, 'authenticate').mockImplementationOnce(()=> okAuthenticationHttpResponse)
        const wrapper = shallow(<LoginForm history={ history }/>);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(false);
        wrapper.find({'name':'email'}).simulate('change', {target : { value: loginInformations.email}});
        wrapper.find({'name':'password'}).simulate('change', {target: { value: loginInformations.password}});
        expect(wrapper.state('email')).toEqual(loginInformations.email);
        expect(wrapper.state('password')).toEqual(loginInformations.password);
        await wrapper.find('Form').simulate('submit',{preventDefault:()=>{}});
        expect(authenticate).not.toHaveBeenCalledWith(loginInformations);
        expect(wrapper.state('isFormValid')).toEqual(false);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(true);
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(localStorage.__STORE__).toEqual({});
        localStorage.clear();
        jest.resetAllMocks();
    })

    it('should not authenticate when login informations are not correct', async () => {
        const history = { 
            push: jest.fn()
        };
        const loginInformations = {
            email:"user@gmail.com",
            password:"12345678"
        };
        const errorHttpResponse = rejectedHttpResponse();
        const authenticate = jest.spyOn(authenticationService, 'authenticate').mockImplementationOnce(()=> errorHttpResponse )
        const wrapper = shallow(<LoginForm history={ history }/>);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(false);
        wrapper.find({'name':'email'}).simulate('change', {target : { value: loginInformations.email}});
        wrapper.find({'name':'password'}).simulate('change', {target: { value: loginInformations.password}});
        expect(wrapper.state('email')).toEqual(loginInformations.email);
        expect(wrapper.state('password')).toEqual(loginInformations.password);
        await wrapper.find('Form').simulate('submit',{preventDefault:()=>{}});
        expect(authenticate).toHaveBeenCalledWith(loginInformations);
        expect(wrapper.state('isFormValid')).toEqual(false);
        expect(wrapper.find('#login-form-invalid-feedback').exists()).toEqual(true);
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(localStorage.__STORE__).toEqual({});
        localStorage.clear();
        jest.resetAllMocks();
    })
});