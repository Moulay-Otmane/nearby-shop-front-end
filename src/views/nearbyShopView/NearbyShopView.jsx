import React, { Component } from 'react';
import shopService from '../../services/shopService/ShopService';
import ShopCard from '../../components/shopCard/ShopCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import LoadingCircle from '../../components/loadingCircle/LoadingCircle';
import CustomSearchForShops from '../../components/customSearchForShops/CustomSearchForShops';
import './NearbyShopView.css';
import { faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class NearbyShopView extends Component {

  constructor(props){
    super(props);
    this.state = {
        nearbyShops:[],
        isLoading:false,
        customLocation: null,
        displaySearchForm:false
    }
  }

  componentDidMount(){
    this.getNearbyShopsByDefaultUserLocaction();
  }

  getNearbyShopsByDefaultUserLocaction(){
      this.setState({isLoading : true, nearbyShops:[]});
      shopService.getNearbyShopsByDefaultLocation()
      .then( nearbyShopsList => {
          this.setState({isLoading:false ,nearbyShops : nearbyShopsList});
      })
      .catch( error => {
          this.setState({ isLoading : false});
        toast.error("A problem occure while trying to retrieve nearby shops using your default location.");
      });
  }

  getNearbyShopsByCustomLocaction(customLocation){
      this.setState({isLoading : true, nearbyShops:[], customLocation : customLocation});
      shopService.getNearbyShopsByCustomLocation(customLocation)
      .then( nearbyShopsList => {
          this.setState({isLoading:false ,nearbyShops : nearbyShopsList});
      })
      .catch( error => {
          this.setState({ isLoading : false});
        toast.error("A problem occure while trying to retrieve nearby shops using the location that you select.");
      });
  }

  refreshData(){
    if(this.state.customLocation == null){ 
        this.getNearbyShopsByDefaultUserLocaction();
    }else{
        this.getNearbyShopsByCustomLocaction(this.state.customLocation);
    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer className="notification-component"/>
        <Container className="nearby-shop-view-container" >
          <Row className="nearby-shop-view-card-container">
              {!this.state.isLoading ?
                (this.state.nearbyShops.length > 0 ?
                  this.state.nearbyShops.map( nearbyShop => (
                        <Col sm="9" md="5" lg="4" className="nearby-shop-view-card-col" key={ nearbyShop.id }>
                            <ShopCard shop = { nearbyShop } 
                          isFavorite = { false }
                          refreshData = {() => this.refreshData() } 
                          />
                        </Col>
                  ))
                :<Col id="empty-result-nearby-shop"><h2> No shop was found within 5 km of your position </h2></Col>) 
                :<LoadingCircle/>
              }
          </Row>
        </Container>
        <Container>
          <Container id="search-form-container" fluid>
            {this.state.displaySearchForm &&  <CustomSearchForShops searchShopsByCustomAddress={ (location) => this.getNearbyShopsByCustomLocaction(location) } closeForm={() => this.setState({displaySearchForm: false})}/>}
            {(!this.state.displaySearchForm && !this.state.isLoading) && <Button id="display-search-form-button" onClick={() => this.setState({displaySearchForm: true}) } variant="primary"><h1><FontAwesomeIcon icon={ faSearchLocation }/></h1></Button>}
          </Container>
        </Container>
	    </React.Fragment>
    )
  }
}