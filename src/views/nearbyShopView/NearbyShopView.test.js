import { shallow } from 'enzyme';
import React from 'react';
import NearbyShopView from './NearbyShopView';
import shopService from '../../services/shopService/ShopService';
import { resolvedHttpResponse, rejectedHttpResponse, shops } from '../../utils/FixturesConstructors';
import {toast} from 'react-toastify';

describe("unit tests of the component NearbyShopView", () => {

    it("should render NearbyShopView Component", () => {
        
        const shopsList = shops();
        const okHttpResponse = resolvedHttpResponse(shopsList);
        const getNearbyShopsByDefaultLocation = jest.spyOn(shopService,'getNearbyShopsByDefaultLocation').mockImplementationOnce(()=>okHttpResponse)
        const wrapper = shallow(<NearbyShopView/>)
        expect(wrapper.find('.notification-component').exists()).toEqual(true);
        expect(wrapper.find('.nearby-shop-view-container').exists()).toEqual(true);
        expect(wrapper.find('.nearby-shop-view-card-container').exists()).toEqual(true);
        expect(getNearbyShopsByDefaultLocation).toHaveBeenCalled();
        expect(wrapper.state('nearbyShops').length).toEqual(2);
        expect(wrapper.state('isLoading')).toEqual(false);
        expect(wrapper.find('.nearby-shop-view-card-col').length).toEqual(2);
        expect(wrapper.find('#empty-result-nearby-shop').exists()).toEqual(false);
        expect(wrapper.find('#display-search-form-button').exists()).toEqual(true);
        wrapper.find('#display-search-form-button').simulate('click');
        expect(wrapper.find('#display-search-form-button').exists()).toEqual(false);
        expect(wrapper.find('CustomSearchForShops').exists()).toEqual(true);
        jest.resetAllMocks();
    })

    it("it should display a message that indicate that no nearby shop was found when the nearby shop list is empty", () => {
        const shopsList = [];
        const okHttpResponse = resolvedHttpResponse(shopsList);
        const getNearbyShopsByDefaultLocation = jest.spyOn(shopService,'getNearbyShopsByDefaultLocation').mockImplementationOnce(()=>okHttpResponse)
        const wrapper = shallow(<NearbyShopView/>)
        expect(wrapper.find('.notification-component').exists()).toEqual(true);
        expect(wrapper.find('.nearby-shop-view-container').exists()).toEqual(true);
        expect(wrapper.find('.nearby-shop-view-card-container').exists()).toEqual(true);
        expect(getNearbyShopsByDefaultLocation).toHaveBeenCalled();
        expect(wrapper.state('nearbyShops').length).toEqual(0);
        expect(wrapper.state('isLoading')).toEqual(false);
        expect(wrapper.find('.nearby-shop-view-card-col').exists()).toEqual(false);
        expect(wrapper.find('#empty-result-nearby-shop').exists()).toEqual(true);
        jest.resetAllMocks();
    })

    it("it should display an error message if there is a problem while retrieve nearby shops list", () => {

        const NotOkHttpResponse = rejectedHttpResponse();
        const displayErrorMessage = jest.spyOn(toast, 'error').mockImplementationOnce(()=>{})
        const getNearbyShopsByDefaultLocation = jest.spyOn(shopService,'getNearbyShopsByDefaultLocation').mockImplementationOnce(()=>NotOkHttpResponse)
        const wrapper = shallow(<NearbyShopView/>)
        expect(wrapper.find('.notification-component').exists()).toEqual(true);
        expect(wrapper.find('.nearby-shop-view-container').exists()).toEqual(true);
        expect(wrapper.find('.nearby-shop-view-card-container').exists()).toEqual(true);
        expect(getNearbyShopsByDefaultLocation).toHaveBeenCalled();
        expect(wrapper.state('nearbyShops').length).toEqual(0);
        expect(wrapper.state('isLoading')).toEqual(false);
        expect(wrapper.find('.nearby-shop-view-card-col').exists()).toEqual(false);
        expect(wrapper.find('#empty-result-nearby-shop').exists()).toEqual(true);
        expect(displayErrorMessage).toHaveBeenCalled();
        jest.resetAllMocks();
    })

});
