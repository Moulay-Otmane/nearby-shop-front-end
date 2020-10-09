import { mount } from 'enzyme';
import React from 'react';
import AppLayout from './AppLayout';
import NearbyShopView from '../nearbyShopView/NearbyShopView';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import { routeLinks } from '../../utils/RouteLinks';
import { MemoryRouter } from 'react-router-dom';
import FavoriteShopView from '../favoriteShopView/FavoriteShopView';

describe("unit tests of the component AppLayout", () => {

    it("should display Nearby shops view", () => {
        const history = {
            location:{
                pathname: routeLinks.NEARBY_SHOPS
            }
        }
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.NEARBY_SHOPS ]}><AppLayout history={ history }/></MemoryRouter>);
        expect(wrapper.find(NavigationBar).exists()).toEqual(true);
        expect(wrapper.find(NearbyShopView).exists()).toEqual(true);
        expect(wrapper.find(FavoriteShopView).exists()).toEqual(false);
        expect(wrapper.find('footer').exists()).toEqual(true);
    });

    it("should display favorites shops view", () => {
        const history = {
            location:{
                pathname: routeLinks.FAVORITES_SHOPS
            }
        }
        const wrapper = mount(<MemoryRouter initialEntries={[ routeLinks.FAVORITES_SHOPS ]}><AppLayout history={ history }/></MemoryRouter>);
        expect(wrapper.find(NavigationBar).exists()).toEqual(true);
        expect(wrapper.find(FavoriteShopView).exists()).toEqual(true);
        expect(wrapper.find(NearbyShopView).exists()).toEqual(false);
        expect(wrapper.find('footer').exists()).toEqual(true);
    });
});