import { shallow } from 'enzyme';
import React from 'react';
import userService from '../../services/userService/UserService';
import shopService from '../../services/shopService/ShopService';
import SignUpForm from './SignUpForm';
import { resolvedHttpResponse, rejectedHttpResponse, cities } from '../../utils/FixturesConstructors';

describe('unit tests of the component signUpForm', () => {

    it('should render signUpForm', () => {
        const citiesList = cities(); 
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementationOnce(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        expect(getCitiesList).toHaveBeenCalled();
        expect(wrapper.find('Form').exists()).toEqual(true);
        expect(wrapper.find('Form FormControl').length).toEqual(5);
        expect(wrapper.find('option').length).toEqual(2+citiesList.length);
        expect(wrapper.find({'name':'city'}).find('option').length).toEqual(1+citiesList.length);
        expect(wrapper.find({'name':'location'}).find('option').length).toEqual(1);
        expect(wrapper.find('.form-controle-feedback-invalid').length).toEqual(0);
        expect(wrapper.find({'name':'email'}).exists()).toEqual(true);
        expect(wrapper.find({'name':'password'}).exists()).toEqual(true);
        expect(wrapper.find({'name':'passwordConfirmation'}).exists()).toEqual(true);
        expect(wrapper.find({'name':'city'}).exists()).toEqual(true);
        expect(wrapper.find({'name':'location'}).exists()).toEqual(true);
        expect(wrapper.find('Form Button').exists()).toEqual(true);
    });

    it('should create user account when all user informations are corrects', async () => {
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const anAddress = aCity.addressList[0];
        const user = {
            email:"user@email.com",
            password:"123456789",
            city:aCity.name,
            location:anAddress.location
        };
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const okSignUpHttpResponse =  resolvedHttpResponse();
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> okSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: user.password}});
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: user.city} });
        expect(getCitiesList).toHaveBeenCalled();
        wrapper.find({ 'name' : 'location' }).simulate('change', {target : { value: JSON.stringify(anAddress)} });
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(user.password);
        expect(wrapper.state('city')).toEqual(user.city);
        expect(wrapper.state('location')).toEqual(user.location);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(signUp).toHaveBeenCalledWith(user);
        expect(wrapper.state('email')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
        expect(wrapper.state('passwordConfirmation')).toEqual('');
        expect(wrapper.state('city')).toEqual('');
        expect(wrapper.state('location')).toEqual(null);
        jest.resetAllMocks();
    });

    it('should not create user account when the email is invalid', async () => {
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const anAddress = aCity.addressList[0];
        const user = {
            email:"invalid.email@.com",
            password:"123456789",
            city:aCity.name,
            location:anAddress.location
        };
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const okSignUpHttpResponse =  resolvedHttpResponse();
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> okSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: user.password}});
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: user.city} });
        expect(getCitiesList).toHaveBeenCalled();
        wrapper.find({ 'name' : 'location' }).simulate('change', {target : { value: JSON.stringify(anAddress)} });
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(user.password);
        expect(wrapper.state('city')).toEqual(user.city);
        expect(wrapper.state('location')).toEqual(user.location);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(wrapper.state('isEmailValid')).toEqual(false);
        expect(wrapper.state('isPasswordValid')).toEqual(true);
        expect(wrapper.state('doesPasswordsMatch')).toEqual(true);
        expect(wrapper.state('isCityValid')).toEqual(true);
        expect(wrapper.state('isAddressValid')).toEqual(true);

        expect(signUp).not.toHaveBeenCalled();
        jest.resetAllMocks();
    });
    
    it('should not create user account when the password is invalid', async () => {
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const anAddress = aCity.addressList[0];
        const user = {
            email:"valid@email.com",
            password:"12345",
            city:aCity.name,
            location:anAddress.location
        };
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const okSignUpHttpResponse =  resolvedHttpResponse();
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> okSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: user.password}});
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: user.city} });
        expect(getCitiesList).toHaveBeenCalled();
        wrapper.find({ 'name' : 'location' }).simulate('change', {target : { value: JSON.stringify(anAddress)} });
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(user.password);
        expect(wrapper.state('city')).toEqual(user.city);
        expect(wrapper.state('location')).toEqual(user.location);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(wrapper.state('isEmailValid')).toEqual(true);
        expect(wrapper.state('isPasswordValid')).toEqual(false);
        expect(wrapper.state('doesPasswordsMatch')).toEqual(true);
        expect(wrapper.state('isCityValid')).toEqual(true);
        expect(wrapper.state('isAddressValid')).toEqual(true);

        expect(signUp).not.toHaveBeenCalled();
        jest.resetAllMocks();
    });
    
    it('should not create user account when the passwords does not match', async () => {
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const anAddress = aCity.addressList[0];
        const user = {
            email:"valid@email.com",
            password:"12345678",
            city:aCity.name,
            location:anAddress.location
        };
        const wrongPasswordConfirmation = "11111111";
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const okSignUpHttpResponse =  resolvedHttpResponse();
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> okSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: wrongPasswordConfirmation}});
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: user.city} });
        expect(getCitiesList).toHaveBeenCalled();
        wrapper.find({ 'name' : 'location' }).simulate('change', {target : { value: JSON.stringify(anAddress)} });
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(wrongPasswordConfirmation);
        expect(wrapper.state('city')).toEqual(user.city);
        expect(wrapper.state('location')).toEqual(user.location);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(wrapper.state('isEmailValid')).toEqual(true);
        expect(wrapper.state('isPasswordValid')).toEqual(true);
        expect(wrapper.state('doesPasswordsMatch')).toEqual(false);
        expect(wrapper.state('isCityValid')).toEqual(true);
        expect(wrapper.state('isAddressValid')).toEqual(true);

        expect(signUp).not.toHaveBeenCalled();
        jest.resetAllMocks();
    });

    it('should not create user account if no city name was selected', async () => {
        const citiesList = cities(); 
        const user = {
            email:"valid@email.com",
            password:"12345678",
        };
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const okSignUpHttpResponse =  resolvedHttpResponse();
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> okSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: user.password}});
        expect(getCitiesList).toHaveBeenCalled();
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(user.password);
        expect(wrapper.state('city')).toEqual('');
        expect(wrapper.state('location')).toEqual(null);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(wrapper.state('isEmailValid')).toEqual(true);
        expect(wrapper.state('isPasswordValid')).toEqual(true);
        expect(wrapper.state('doesPasswordsMatch')).toEqual(true);
        expect(wrapper.state('isCityValid')).toEqual(false);
        expect(wrapper.state('isAddressValid')).toEqual(false);

        expect(signUp).not.toHaveBeenCalled();
        jest.resetAllMocks();
    });

    it('should not create user account if no address was selected', async () => {
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const user = {
            email:"valid@email.com",
            password:"12345678",
            city:aCity.name
        };
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const okSignUpHttpResponse =  resolvedHttpResponse();
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> okSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: user.password}});
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: user.city} });
        expect(getCitiesList).toHaveBeenCalled();
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(user.password);
        expect(wrapper.state('city')).toEqual(user.city);
        expect(wrapper.state('location')).toEqual(null);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(wrapper.state('isEmailValid')).toEqual(true);
        expect(wrapper.state('isPasswordValid')).toEqual(true);
        expect(wrapper.state('doesPasswordsMatch')).toEqual(true);
        expect(wrapper.state('isCityValid')).toEqual(true);
        expect(wrapper.state('isAddressValid')).toEqual(false);

        expect(signUp).not.toHaveBeenCalled();
        jest.resetAllMocks();
    });

    it('should throw an error when the email is already used', async () => {
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const anAddress = aCity.addressList[0];
        const user = {
            email:"user@email.com",
            password:"123456789",
            city:aCity.name,
            location:anAddress.location
        };
        const getCitiesList = jest.spyOn(shopService, "getCities").mockImplementation(() => citiesList);
        const wrapper = shallow(<SignUpForm/>);
        const response = {
                            exceptionMessage: "EMAIL_ALREADY_USED"
                        }
        
        const emailAlreadyUsedSignUpHttpResponse =  rejectedHttpResponse(response);
        const signUp = jest.spyOn(userService, 'signUp').mockImplementationOnce(()=> emailAlreadyUsedSignUpHttpResponse);
        wrapper.find({ 'name' : 'email' }).simulate('change', {target : { value: user.email} });
        wrapper.find({ 'name' : 'password' }).simulate('change', {target : { value: user.password} });
        wrapper.find({ 'name' : 'passwordConfirmation'}).simulate('change', {target: { value: user.password}});
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: user.city} });
        expect(getCitiesList).toHaveBeenCalled();
        wrapper.find({ 'name' : 'location' }).simulate('change', {target : { value: JSON.stringify(anAddress)} });
        expect(wrapper.state('email')).toEqual(user.email);
        expect(wrapper.state('password')).toEqual(user.password);
        expect(wrapper.state('passwordConfirmation')).toEqual(user.password);
        expect(wrapper.state('city')).toEqual(user.city);
        expect(wrapper.state('location')).toEqual(user.location);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(signUp).toHaveBeenCalledWith(user);
        expect(wrapper.state('isEmailValid')).toEqual(false);
        expect(wrapper.state('isPasswordValid')).toEqual(true);
        expect(wrapper.state('doesPasswordsMatch')).toEqual(true);
        expect(wrapper.state('isCityValid')).toEqual(true);
        expect(wrapper.state('isAddressValid')).toEqual(true);
        jest.resetAllMocks();
    });
});