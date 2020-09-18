import * as Sync_Promise from 'synchronous-promise'

export const resolvedHttpResponse = ( responseBody = {} ) => Promise.resolve(responseBody);

export const rejectedHttpResponse = ( responseBody = {}) => Sync_Promise.SynchronousPromise.reject({content:{
    json: () => Sync_Promise.SynchronousPromise.resolve(responseBody)
}});

export const jwtToken = () => {
    return {token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIi11J1c2VyLnRlc3RAZ21RY29tIiwiZXhwIjoxNTk5Njk5NTA4L05pYXQiOjE1OTk2NjcxMDh9.BBE2CkCtOHsE9s91sNG0ogICr-s0p1G9epSlWyCKys3EP0K6gy-r5_P32VSQJorUB8KLMpGcvihe8DEsWgGsQ"}
};

export const cities = () => {
    return [
        {
            name:"City 1",
            addressList:[
                {
                    address:'address 1',
                    location:{
                        latitude: 1111,
                        longitude: 2222
                    }
                },
                {
                    address:'address 2',
                    location:{
                        latitude: 3333 ,
                        longitude: 4444
                    }
                }
            ]
        },
        {
            name:"City 2",
            addressList:[
                {
                    address:'address 3',
                    location:{
                        latitude: 1122,
                        longitude: 2211
                    }
                },
                {
                    address:'address 4',
                    location:{
                        latitude: 3311 ,
                        longitude: 4422
                    }
                }
            ]
        }
    ]
}