import handleResponse from '../../utils/ResponseHandler';
import { sendRequest } from '../../utils/RequestManager';
class ShopService{

    getFavoritesShops(){
        return sendRequest('/rest-service/shops/favorites', 'get', null, true)
        .then(handleResponse)
        .then(response => response.json())
    }

    getNearbyShopsByDefaultLocation(){
        return sendRequest('/rest-service/shops/find-by-default-location', 'get', null, true)
        .then(handleResponse)
        .then(response => response.json())
    }

    getNearbyShopsByCustomLocation( location){
        return sendRequest(`/rest-service/shops/find-by-custom-location?longitude=${location.x}&latitude=${location.y}`, 'get', null, true)
        .then(handleResponse)
        .then(response => response.json())
    }

    removeShopFromFavorites(shopId){
        return sendRequest(`/rest-service/shops/remove-from-favorite/${shopId}`, 'PATCH', null, true)
        .then(handleResponse)
    }

    addOrUpdateUserReactionAboutShop(shopId, reactionType){
        return sendRequest(`/rest-service/shops/add-reaction/${shopId}`, 'PATCH', JSON.stringify({ reactionType : reactionType }), true).then(handleResponse)
    }

}

const shopService = new ShopService();
export default shopService;