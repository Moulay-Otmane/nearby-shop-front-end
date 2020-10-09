import { shallow } from 'enzyme';
import React from 'react';
import CustomSearchForShops from './CustomSearchForShops';
import cityService from '../../services/cityService/CityService';
import { resolvedHttpResponse, rejectedHttpResponse, cities } from '../../utils/FixturesConstructors';
import {toast} from 'react-toastify';

describe("unit tests of the component CustomSearchForShops", () => {
    
    it("should render CustomSearchForShops component", () => {
        const citiesList = cities(); 
        const getCitiesList = jest.spyOn(cityService, "getCities").mockImplementationOnce(() => resolvedHttpResponse(citiesList));
        const wrapper = shallow(<CustomSearchForShops searchShopsByCustomAddress={() => {}} closeForm={ () => {} }/>);
        expect(getCitiesList).toHaveBeenCalled();
        expect(wrapper.find('Form').exists()).toEqual(true);
        expect(wrapper.find('Form FormControl').length).toEqual(2);
        expect(wrapper.find({'name':'city'}).exists()).toEqual(true);
        expect(wrapper.find({'name':'location'}).exists()).toEqual(true);
        expect(wrapper.find('option').length).toEqual(2+citiesList.length);
        expect(wrapper.find({'name':'city'}).find('option').length).toEqual(1+citiesList.length);
        expect(wrapper.find({'name':'location'}).find('option').length).toEqual(1);
        expect(wrapper.find('Form Button').exists()).toEqual(true);
        jest.resetAllMocks();
    });

    it("should display error message if there was an error while retrieving cities list", () => {

        const searchShopsByCustomAddress = jest.fn();
        const getCitiesList = jest.spyOn(cityService, "getCities").mockImplementationOnce(() => rejectedHttpResponse());
        const displayError = jest.spyOn(toast, "error").mockImplementationOnce(() => {})
        shallow(<CustomSearchForShops searchShopsByCustomAddress={searchShopsByCustomAddress} closeForm={ () => {} }/>);
        expect(getCitiesList).toHaveBeenCalled();
        expect(displayError).toHaveBeenCalled();
        expect(searchShopsByCustomAddress).not.toHaveBeenCalled();
        jest.resetAllMocks();
    });

    it("should call search for nearby shops using custom address", async() => {
        const searchShopsByCustomAddress = jest.fn();
        const closeForm = jest.fn();
        const citiesList = cities(); 
        const aCity = citiesList[0];
        const anAddress = aCity.addressList[0];
        const getCitiesList = jest.spyOn(cityService, "getCities").mockImplementation(() => resolvedHttpResponse(citiesList));
        const wrapper = shallow(<CustomSearchForShops searchShopsByCustomAddress={searchShopsByCustomAddress} closeForm={ closeForm }/>);
        wrapper.find({ 'name' : 'city' }).simulate('change', {target : { value: aCity.name} });
        expect(getCitiesList).toHaveBeenCalled();
        wrapper.find({ 'name' : 'location' }).simulate('change', {target : { value: JSON.stringify(anAddress)} });
        expect(wrapper.state('city')).toEqual(aCity.name);
        expect(wrapper.state('location')).toEqual(anAddress.location);

        await wrapper.find('Form').simulate('submit', {preventDefault: () => {}});

        expect(searchShopsByCustomAddress).toHaveBeenCalledWith(anAddress.location);
        expect(closeForm).toHaveBeenCalled();
        jest.resetAllMocks();
    });
});
