import handleResponse from '../../utils/ResponseHandler';
import { sendRequest } from '../../utils/RequestManager';

class CityService{

    getCities(){
        return sendRequest('/rest-service/cities', 'get', null, false)
        .then(handleResponse)
        .then(response => response.json());
    }
}

const cityService = new CityService();
export default cityService;