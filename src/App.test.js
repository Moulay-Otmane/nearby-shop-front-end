import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { routeLinks } from './utils/RouteLinks';
import App from './App';
import LoginView from './views/loginView/LoginView';
import SignUpView from './views/signUpView/SignUpView';
import AppLayout from './views/appLayout/AppLayout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

describe("unit tests of the component App", () => {

    it("should render login view  when the path is '/' ", () => {
        const wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><App/></MemoryRouter>);
        expect(wrapper.find(LoginView).exists()).toEqual(true);
        expect(wrapper.find(SignUpView).exists()).toEqual(false);
        expect(wrapper.find(ProtectedRoute).exists()).toEqual(false);
    });

    it("should render login view  when the path is '/login' ", () => {
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.LOGIN ]}><App/></MemoryRouter>);
        expect(wrapper.find(LoginView).exists()).toEqual(true);
        expect(wrapper.find(SignUpView).exists()).toEqual(false);
        expect(wrapper.find(ProtectedRoute).exists()).toEqual(false);
    });

    it("should render sign-up view  when the path is '/sign-up' ", () => {
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.SIGN_UP ]}><App/></MemoryRouter>);
        expect(wrapper.find(SignUpView).exists()).toEqual(true);
        expect(wrapper.find(LoginView).exists()).toEqual(false);
        expect(wrapper.find(ProtectedRoute).exists()).toEqual(false);
    });

    it("should render ProtectedRoute component when the path starts with '/nearbyShops' ", () => {
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.NEARBY_SHOPS ]}><App/></MemoryRouter>);
        expect(wrapper.find(ProtectedRoute).exists()).toEqual(true);
        expect(wrapper.find(SignUpView).exists()).toEqual(false);
        expect(wrapper.find(LoginView).exists()).toEqual(false);
    });
})
