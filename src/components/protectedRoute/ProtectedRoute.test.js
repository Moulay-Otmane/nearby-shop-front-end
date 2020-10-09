import { mount } from 'enzyme';
import React from 'react';
import authenticationService from '../../services/authenticationService/AuthenticationService';
import { resolvedHttpResponse, rejectedHttpResponse } from '../../utils/FixturesConstructors';
import ProtectedRoute from './ProtectedRoute';
import { MemoryRouter } from 'react-router-dom';
import { routeLinks } from '../../utils/RouteLinks';
import AppLayout from '../../views/appLayout/AppLayout';
import LoginView from '../../views/loginView/LoginView';
import LoadingView from '../../views/loadingView/LoadingView';

describe("unit tests of the component ProtectedRoute", () => {

    it("should render the component AppLayout", () => {
        const checkTokenValidity = jest.spyOn(authenticationService, "checkTokenValidity").mockImplementationOnce(()=> resolvedHttpResponse(true));
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.NEARBY_SHOPS ]}><ProtectedRoute component={AppLayout}/></MemoryRouter>);
        expect(checkTokenValidity).toHaveBeenCalledTimes(1);
        expect(wrapper.find(AppLayout).exists()).toEqual(true);
        expect(wrapper.find(LoginView).exists()).toEqual(false);
        expect(wrapper.find(LoadingView).exists()).toEqual(false);
        jest.clearAllMocks();
    });

    it("should render the component LoginView component if there was an error while checking token validity", () => {
        const checkTokenValidity = jest.spyOn(authenticationService, "checkTokenValidity").mockImplementationOnce(()=> rejectedHttpResponse());
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.NEARBY_SHOPS ]}><ProtectedRoute component={AppLayout}/></MemoryRouter>);
        expect(checkTokenValidity).toHaveBeenCalledTimes(1);
        expect(wrapper.find(LoginView).exists()).toEqual(true);
        expect(wrapper.find(AppLayout).exists()).toEqual(false);
        expect(wrapper.find(LoadingView).exists()).toEqual(false);
        jest.clearAllMocks();
    })

    it("should render the component LoginView component", () => {
        const checkTokenValidity = jest.spyOn(authenticationService, "checkTokenValidity").mockImplementationOnce(()=> resolvedHttpResponse(false));
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.NEARBY_SHOPS ]}><ProtectedRoute component={AppLayout}/></MemoryRouter>);
        expect(checkTokenValidity).toHaveBeenCalledTimes(1);
        expect(wrapper.find(LoginView).exists()).toEqual(true);
        expect(wrapper.find(AppLayout).exists()).toEqual(false);
        expect(wrapper.find(LoadingView).exists()).toEqual(false);
        jest.clearAllMocks();
    });

    it("should render the component LoadingView component", () => {
        jest.spyOn(React, "useEffect").mockImplementationOnce(()=>{});
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.NEARBY_SHOPS ]}><ProtectedRoute component={AppLayout}/></MemoryRouter>);
        expect(wrapper.find(LoadingView).exists()).toEqual(true);
        expect(wrapper.find(LoginView).exists()).toEqual(false);
        expect(wrapper.find(AppLayout).exists()).toEqual(false);
        jest.clearAllMocks();
    });

    
});