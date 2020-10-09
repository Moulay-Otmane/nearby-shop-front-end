import React, { Component } from 'react';
import shopService from '../../services/shopService/ShopService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Container } from 'react-bootstrap';
import ShopCard from '../../components/shopCard/ShopCard';
import LoadingCircle from '../../components/loadingCircle/LoadingCircle';
import './FavoriteShopView.css';

export default class FavoriteShopView extends Component {

  constructor(props){
    super(props);
    this.state = {
        favoritesShops:[],
        isLoading:false
    }
  }


  componentDidMount(){
	this.retrieveFavoritesShops();
  }

  retrieveFavoritesShops(){
      this.setState({isLoading : true, favoritesShops:[]});
      shopService.getFavoritesShops()
      .then( favoritesShopsList => {
          this.setState({isLoading:false ,favoritesShops : favoritesShopsList});
      })
      .catch( error => {
          this.setState({ isLoading : false});
        toast.error("A problem occure while trying to retrieve favorites shops.");
      });
  }

  displayErrorNotification(message){
	toast.error(message);
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer className="notification-component"/>
        <Container className="favorite-shop-view-container" >
          <Row className="favorite-shop-view-card-container">
              {!this.state.isLoading ?
                (this.state.favoritesShops.length > 0 ?
                  this.state.favoritesShops.map( favoriteShop => (
                        <Col sm="9" md="5" lg="4" className="favorite-shop-view-card-col" key={ favoriteShop.id }>
                            <ShopCard shop = { favoriteShop } 
                          isFavorite = { true }
                          refreshData = {() => this.retrieveFavoritesShops() } 
                          />
                        </Col>
                  ))
                :<Col id="empty-result-favorite-shop"><h2> No favorites shops were found </h2></Col>) 
                :<LoadingCircle/>
              }
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}