import { shallow } from 'enzyme';
import React from 'react';
import FavoriteShopView from './FavoriteShopView'
import shopService from '../../services/shopService/ShopService';
import { resolvedHttpResponse, rejectedHttpResponse, shops } from '../../utils/FixturesConstructors';
import {toast} from 'react-toastify';

describe("unit tests of the component FavoriteShopView", () => {

    it("should render FavoriteShopView Component", () => {
        
        const shopsList = shops();
        const okHttpResponse = resolvedHttpResponse(shopsList);
        const getFavoritesShops = jest.spyOn(shopService,'getFavoritesShops').mockImplementationOnce(()=>okHttpResponse)
        const wrapper = shallow(<FavoriteShopView/>)
        expect(wrapper.find('.notification-component').exists()).toEqual(true);
        expect(wrapper.find('.favorite-shop-view-container').exists()).toEqual(true);
        expect(wrapper.find('.favorite-shop-view-card-container').exists()).toEqual(true);
        expect(getFavoritesShops).toHaveBeenCalled();
        expect(wrapper.state('favoritesShops').length).toEqual(2);
        expect(wrapper.state('isLoading')).toEqual(false);
        expect(wrapper.find('.favorite-shop-view-card-col').length).toEqual(2);
        expect(wrapper.find('#empty-result-favorite-shop').exists()).toEqual(false);
        jest.resetAllMocks();
    })

    it("it should display a message that indicate that no favorite shop was found when the favorites shops list is empty", () => {
        const shopsList = [];
        const okHttpResponse = resolvedHttpResponse(shopsList);
        const getFavoritesShops = jest.spyOn(shopService,'getFavoritesShops').mockImplementationOnce(()=>okHttpResponse)
        const wrapper = shallow(<FavoriteShopView/>)
        expect(wrapper.find('.notification-component').exists()).toEqual(true);
        expect(wrapper.find('.favorite-shop-view-container').exists()).toEqual(true);
        expect(wrapper.find('.favorite-shop-view-card-container').exists()).toEqual(true);
        expect(getFavoritesShops).toHaveBeenCalled();
        expect(wrapper.state('favoritesShops').length).toEqual(0);
        expect(wrapper.state('isLoading')).toEqual(false);
        expect(wrapper.find('.favorite-shop-view-card-col').exists()).toEqual(false);
        expect(wrapper.find('#empty-result-favorite-shop').exists()).toEqual(true);
        jest.resetAllMocks();
    })

    it("it should display an error message if there is a problem while retrieve favorites shops list", () => {
        
        const NotOkHttpResponse = rejectedHttpResponse();
        const displayErrorMessage = jest.spyOn(toast, 'error').mockImplementationOnce(()=>{});
        const getFavoritesShops = jest.spyOn(shopService,'getFavoritesShops').mockImplementationOnce(()=>NotOkHttpResponse);
        const wrapper = shallow(<FavoriteShopView/>);
        expect(wrapper.find('.notification-component').exists()).toEqual(true);
        expect(wrapper.find('.favorite-shop-view-container').exists()).toEqual(true);
        expect(wrapper.find('.favorite-shop-view-card-container').exists()).toEqual(true);
        expect(getFavoritesShops).toHaveBeenCalled();
        expect(wrapper.state('favoritesShops').length).toEqual(0);
        expect(wrapper.state('isLoading')).toEqual(false);
        expect(wrapper.find('.favorite-shop-view-card-col').exists()).toEqual(false);
        expect(wrapper.find('#empty-result-favorite-shop').exists()).toEqual(true);
        expect(displayErrorMessage).toHaveBeenCalled();
        jest.resetAllMocks();
    })

});
