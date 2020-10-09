import { shallow } from 'enzyme';
import React from 'react';
import ShopCard from './ShopCard';
import shopService from '../../services/shopService/ShopService';
import { resolvedHttpResponse } from '../../utils/FixturesConstructors';
import {shops} from '../../utils/FixturesConstructors';
import {reactionType} from '../../utils/Constants';
describe("unit tests of the component ShopCard", () => {

    it("should render normal shop card", () => {
        const shop= shops()[0];
        const wrapper = shallow(<ShopCard isFavorite={ false } shop={shop} refreshData={()=> jest.fn() }/>)
        expect(wrapper.find('.shop-information-row.distance').exists()).toEqual(true);
        expect(wrapper.find('.picture-row').exists()).toEqual(true);
        expect(wrapper.find('.shop-information-row').exists()).toEqual(true);
        expect(wrapper.find('.information-col').length).toEqual(2);
        expect(wrapper.find('.shop-card-footer').exists()).toEqual(true);
        expect(wrapper.find('#like-button').exists()).toEqual(true);
        expect(wrapper.find('#dislike-button').exists()).toEqual(true);
        expect(wrapper.find('#remove-button').exists()).toEqual(false);
    });

    it("should render favorite shop card", () => {
        const shop= shops()[0];
        const wrapper = shallow(<ShopCard isFavorite={ true } shop={shop} refreshData={()=> jest.fn() }/>)
        expect(wrapper.find('.shop-information-row.distance').exists()).toEqual(false);
        expect(wrapper.find('.picture-row').exists()).toEqual(true);
        expect(wrapper.find('.shop-information-row').exists()).toEqual(true);
        expect(wrapper.find('.information-col').length).toEqual(2);
        expect(wrapper.find('.shop-card-footer').exists()).toEqual(true);
        expect(wrapper.find('#like-button').exists()).toEqual(false);
        expect(wrapper.find('#dislike-button').exists()).toEqual(false);
        expect(wrapper.find('#remove-button').exists()).toEqual(true);
    });

    it("should add shop to favorite shops", async() => {
        const shop= shops()[0];
        const refreshData = jest.fn();
        const okHttpResponse = resolvedHttpResponse();
        const addOrUpdateUserReactionAboutShop = jest.spyOn(shopService, 'addOrUpdateUserReactionAboutShop').mockImplementationOnce(() => okHttpResponse)
        const wrapper = shallow(<ShopCard isFavorite={ false } shop={shop} refreshData={refreshData }/>)
        expect(wrapper.find('.shop-information-row.distance').exists()).toEqual(true);
        expect(wrapper.find('.picture-row').exists()).toEqual(true);
        expect(wrapper.find('.shop-information-row').exists()).toEqual(true);
        expect(wrapper.find('.information-col').length).toEqual(2);
        expect(wrapper.find('.shop-card-footer').exists()).toEqual(true);
        expect(wrapper.find('#like-button').exists()).toEqual(true);
        expect(wrapper.find('#dislike-button').exists()).toEqual(true);
        expect(wrapper.find('#remove-button').exists()).toEqual(false);
        await wrapper.find('#like-button').simulate('click');
        expect(addOrUpdateUserReactionAboutShop).toHaveBeenCalledWith(shop.id, reactionType.LIKE);
        expect(refreshData).toHaveBeenCalled();
        jest.resetAllMocks();        
    });

    it("should designate a shop as disliked", async() => {
        const shop= shops()[0];
        const refreshData = jest.fn();
        const okHttpResponse = resolvedHttpResponse();
        const addOrUpdateUserReactionAboutShop = jest.spyOn(shopService, 'addOrUpdateUserReactionAboutShop').mockImplementationOnce(() => okHttpResponse)
        const wrapper = shallow(<ShopCard isFavorite={ false } shop={shop} refreshData={refreshData }/>)
        expect(wrapper.find('.shop-information-row.distance').exists()).toEqual(true);
        expect(wrapper.find('.picture-row').exists()).toEqual(true);
        expect(wrapper.find('.shop-information-row').exists()).toEqual(true);
        expect(wrapper.find('.information-col').length).toEqual(2);
        expect(wrapper.find('.shop-card-footer').exists()).toEqual(true);
        expect(wrapper.find('#like-button').exists()).toEqual(true);
        expect(wrapper.find('#dislike-button').exists()).toEqual(true);
        expect(wrapper.find('#remove-button').exists()).toEqual(false);
        await wrapper.find('#dislike-button').simulate('click');
        expect(addOrUpdateUserReactionAboutShop).toHaveBeenCalledWith(shop.id, reactionType.DISLIKE);
        expect(refreshData).toHaveBeenCalled();
        jest.resetAllMocks();
    });

    it("should remove shop from favorites shops", async() => {
        const shop= shops()[0];
        const refreshData = jest.fn();
        const okHttpResponse = resolvedHttpResponse();
        const removeShopFromFavorites = jest.spyOn(shopService, 'removeShopFromFavorites').mockImplementationOnce(() => okHttpResponse)
        const wrapper = shallow(<ShopCard isFavorite={ true } shop={shop} refreshData={refreshData }/>)
        expect(wrapper.find('.shop-information-row.distance').exists()).toEqual(false);
        expect(wrapper.find('.picture-row').exists()).toEqual(true);
        expect(wrapper.find('.shop-information-row').exists()).toEqual(true);
        expect(wrapper.find('.information-col').length).toEqual(2);
        expect(wrapper.find('.shop-card-footer').exists()).toEqual(true);
        expect(wrapper.find('#like-button').exists()).toEqual(false);
        expect(wrapper.find('#dislike-button').exists()).toEqual(false);
        expect(wrapper.find('#remove-button').exists()).toEqual(true);
        await wrapper.find('#remove-button').simulate('click');
        expect(removeShopFromFavorites).toHaveBeenCalledWith(shop.id);
        expect(refreshData).toHaveBeenCalled();
        jest.resetAllMocks();
    });
});