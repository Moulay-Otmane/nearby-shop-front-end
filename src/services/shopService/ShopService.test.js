import nock from 'nock';
import shopService from './ShopService';
import { shops } from '../../utils/FixturesConstructors';
import { isEqual } from 'lodash';

describe(' unit tests of shop service', () => {
    
    it("should return nearby shops using default user location", () => {
        nock("http://localhost:80")
        .get('/rest-service/shops/find-by-default-location')
        .reply(200, shops(), {'Content-Type': 'application/json'})

        return shopService.getNearbyShopsByDefaultLocation()
                .then(nearbyShops => {
                    expect(nearbyShops).toBeDefined();
                    expect(nearbyShops.length).toEqual(shops().length);
                    nearbyShops.map(nearbyShop =>{
                        expect(shops().filter(shop=>isEqual(shop, nearbyShop)).length>0).toEqual(true)
                    });
                })
    });

    it("should throw an error if there was an error while searching for user informations to get nearby shops by default address", () => {
        nock("http://localhost:80")
        .get('/rest-service/shops/find-by-default-location')
        .reply(404)

        return shopService.getNearbyShopsByDefaultLocation()
                .catch(error => {
                    expect(error.content).toBeDefined();
                })

    });

    it("should return nearby shops using custom location", () => {
        const location = {
            x:1111,
            y:2222
        }

        nock("http://localhost:80")
        .get(`/rest-service/shops/find-by-custom-location?longitude=${location.x}&latitude=${location.y}`)
        .reply(200, shops(), {'Content-Type': 'application/json'})

        return shopService.getNearbyShopsByCustomLocation(location)
                .then(nearbyShops => {
                    expect(nearbyShops).toBeDefined();
                    expect(nearbyShops.length).toEqual(shops().length);
                    nearbyShops.map(nearbyShop =>{
                        expect(shops().filter(shop=>isEqual(shop, nearbyShop)).length>0).toEqual(true)
                    });
                })
    });

    it("should throw an error if there was an error while searching for user informations to get nearby shops using custom location", () => {
        const location = {
            x:1111,
            y:2222
        }

        nock("http://localhost:80")
        .get(`/rest-service/shops/find-by-custom-location?longitude=${location.x}&latitude=${location.y}`)
        .reply(404)

        return shopService.getNearbyShopsByCustomLocation(location)
                .catch(error => {
                    expect(error.content).toBeDefined();
                })
    });

    it("should return favorites shops", () => {
        nock("http://localhost:80")
        .get('/rest-service/shops/favorites')
        .reply(200, shops(), {'Content-Type': 'application/json'});

        return shopService.getFavoritesShops()
                .then(nearbyShops => {
                    expect(nearbyShops).toBeDefined();
                    expect(nearbyShops.length).toEqual(shops().length);
                    nearbyShops.map(nearbyShop =>{
                        expect(shops().filter(shop=>isEqual(shop, nearbyShop)).length>0).toEqual(true)
                    });
                })
    });

    it("should throw an error if there was an error while searching for user informations to get favorites shops", () => {
        nock("http://localhost:80")
        .get('/rest-service/shops/favorites')
        .reply(404);

        return shopService.getFavoritesShops()
                .catch(error => 
                    expect(error.content).toBeDefined()
                )
    });


    it("should add user reaction about shop", () => {
        const shopId = "123shop12345abcd6789"
        const body = {
            reactionType: "LIKE"
        }
        nock("http://localhost:80")
        .patch(`/rest-service/shops/add-reaction/${shopId}`, body)
        .reply(200);

        return shopService.addOrUpdateUserReactionAboutShop(shopId, body.reactionType)
                .then(response => {
                    expect(response).toBeDefined()
                })
    });

    it("should throw an error if there was an error while searching for user informations to add user reaction about shop", () => {
        const shopId = "123shop12345abcd6789"
        const body = {
            reactionType: "LIKE"
        }
        nock("http://localhost:80")
        .patch(`/rest-service/shops/add-reaction/${shopId}`, body)
        .reply(404);

        return shopService.addOrUpdateUserReactionAboutShop(shopId, body.reactionType)
                .catch(error => {
                    expect(error.content).toBeDefined()
                })
    });

    it("should remove shop from favorites", () => {
        const shopId = "123shop12345abcd6789"
        nock("http://localhost:80")
        .patch(`/rest-service/shops/remove-from-favorite/${shopId}`)
        .reply(200);

        return shopService.removeShopFromFavorites(shopId)
                .then(response => {
                    expect(response).toBeDefined()
                })
    });

    it("should throw an error if there was an error while searching for user informations to remove shop from favorites", () => {
        const shopId = "123shop12345abcd6789"
        nock("http://localhost:80")
        .patch(`/rest-service/shops/remove-from-favorite/${shopId}`)
        .reply(404);
        return shopService.removeShopFromFavorites(shopId)
                .catch(error => {
                    expect(error.content).toBeDefined()
                })
    });
})