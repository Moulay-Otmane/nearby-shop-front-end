import nock from 'nock';
import cityService from './CityService';
import { cities } from '../../utils/FixturesConstructors'
import { isEqual } from 'lodash';

describe('unit tests of city service', () => {

    it("should returns the list of all cities in the database", () => {

        nock("http://localhost:80")
        .get("/rest-service/cities")
        .reply(200, cities(),{'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})

        return cityService.getCities()
                .then(cityList => {
                    expect(cityList).toBeDefined();
                    expect(cityList.length).toEqual(cities().length);
                    cityList.map( cityFromResponse => {
                        expect(cities().filter(city => isEqual(cityFromResponse, city)).length>0).toEqual(true);
                    })
                })
    })
});