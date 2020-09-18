class ShopService{

    getCities(){
        const cities = [
            {
                name:"Casablanca",
                addressList:[
                    {
                        address:'Maarif',
                        location:{
                            latitude:'5678',
                            longitude:'1234'
                        }
                    },
                    {
                        address:'avenue mohamed 5',
                        location:{
                            latitude:'5611',
                            longitude:'12224'
                        }
                    }
                ]
            },
            {
                name:"Fes",
                addressList:[
                    {
                        address:'avenue mohamed 6',
                        location:{
                            latitude:'563338',
                            longitude:'32222'
                        }
                    },
                    {
                        address:'avenue hassan 2',
                        location:{
                            latitude:'5621178',
                            longitude:'12112134'
                        }
                    }
                ]
            }
            
            
        ];
        return cities;
    }

}

const shopService = new ShopService();
export default shopService;