import * as Sync_Promise from 'synchronous-promise'

export const resolvedHttpResponse = ( responseBody = {} ) => Sync_Promise.SynchronousPromise.resolve(responseBody);

export const rejectedHttpResponse = ( responseBody = {}) => Sync_Promise.SynchronousPromise.reject({content:{
    json: () => Sync_Promise.SynchronousPromise.resolve(responseBody)
}});

export const jwtToken = () => {
    return {token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIi11J1c2VyLnRlc3RAZ21RY29tIiwiZXhwIjoxNTk5Njk5NTA4L05pYXQiOjE1OTk2NjcxMDh9.BBE2CkCtOHsE9s91sNG0ogICr-s0p1G9epSlWyCKys3EP0K6gy-r5_P32VSQJorUB8KLMpGcvihe8DEsWgGsQ"}
};

export const shops = () => {
    return [
        {
            id:"shop1111111111",
            name:"shop 1",
            email:"shop.1@email.fr",
            picture:"http://placehold.it/250x120/292b2c",
            city:"City 1",
            address:"address 1",
            distance: 5
            
        },
        {   id:"shop22222222222",
            name:"shop 2",
            email:"shop.2@email.fr",
            picture:"http://placehold.it/250x120/292b2c",
            city:"City 1",
            address:"address 2",
            distance: 5
            
        }
    ];
}

export const cities = () => {
    return [
        {   id:"city111111111111",
            name:"City 1",
            addressList:[
                {
                    addressLine:'address 1',
                    location:{
                        x: 1111,
                        y: 2222
                    }
                },
                {
                    addressLine:'address 2',
                    location:{
                        x: 3333 ,
                        y: 4444
                    }
                }
            ]
        },
        {
            id:"city2222222222222",
            name:"City 2",
            addressList:[
                {
                    addressLine:'address 3',
                    location:{
                        x: 1122,
                        y: 2211
                    }
                },
                {
                    addressLine:'address 4',
                    location:{
                        x: 3311 ,
                        y: 4422
                    }
                }
            ]
        }
    ]
}