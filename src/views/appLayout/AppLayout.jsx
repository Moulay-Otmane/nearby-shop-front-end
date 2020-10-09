import React, { Component } from "react";
import { Container } from "react-bootstrap";
import nearbyShopBackgroundImg from "../../assets/images/nearby-shop-background-img.png";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import { Switch, Route } from "react-router-dom";
import NearbyShopView from "../nearbyShopView/NearbyShopView";
import FavoriteShopView from "../favoriteShopView/FavoriteShopView";
import { routeLinks } from '../../utils/RouteLinks';
import './AppLayout.css';

export default class AppLayout extends Component{

    render(){
        return (
            <Container className="background-img-container" style={{ background: `url(${nearbyShopBackgroundImg})`}} fluid>
               <NavigationBar history={ this.props.history }/>
                <Container className="background-img-filter" fluid>
                        <Switch>
                            <Route exact path={ routeLinks.NEARBY_SHOPS } component={ NearbyShopView }/>
                            <Route exact path={ routeLinks.FAVORITES_SHOPS } component={ FavoriteShopView}/>
                        </Switch>
                </Container>
                <footer className="footer-style" > &copy; 2020 Nearby Shops </footer>
            </Container>
        )
    }
}