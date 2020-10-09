import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { faMapMarkerAlt, faEnvelope, faRoute, faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shopService from '../../services/shopService/ShopService';
import './ShopCard.css';
import PropTypes from 'prop-types';
import { reactionType } from '../../utils/Constants';
import { toast } from 'react-toastify';

export default class ShopCard extends Component {

  like(){
      shopService.addOrUpdateUserReactionAboutShop(this.props.shop.id, reactionType.LIKE)
      .then(() => {
          this.props.refreshData();
      }).catch(() => {
        toast.error("A problem occure while trying to add the shop to favorites shops");
      })
  }

  dislike(){
      shopService.addOrUpdateUserReactionAboutShop(this.props.shop.id, reactionType.DISLIKE)
      .then(() => {
          this.props.refreshData();
      }).catch(() => {
        toast.error("A problem occure while trying to designate the shop as disliked");
      })
  }

  getDistanceExpression(distanceInKilometers){
      const kilometers = Math.trunc(distanceInKilometers);
      const meters = Math.trunc((distanceInKilometers - kilometers)*1000);
      return kilometers+" Km and "+meters+" m";
  }

  removeFromFavorite(){
      shopService.removeShopFromFavorites(this.props.shop.id)
      .then(() => {
        try{
          this.props.refreshData();
        }
        catch(err) {
          console.log( err.message);
        }
      }).catch(() => {
        toast.error("A problem occure while trying to remove the shop from the list of favorites shops.");
      })
  }

  render() {
    return (
    
        <Card className="shop-card">
          <Card.Body className="subTitleCard">
            <Card.Title>{this.props.shop.name}</Card.Title>
            { !this.props.isFavorite && 
              <Row className="shop-information-row distance" >
                <Col className="information-icon-col distance" style={{display:"flex", justifyContent:"center"}}>
                  <FontAwesomeIcon icon={faRoute} className="information-icon distance"/><span>  { this.getDistanceExpression(this.props.shop.distance)} </span>
                </Col>
              </Row>
            }
            <Row className="picture-row"><Col md lg="12"><Card.Img variant="top" src={this.props.shop.picture} className="shop-picture"/></Col></Row>
            <Row className="shop-information-row">
              <Col xs="1" className="information-icon-col">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="information-icon"/>
              </Col>
              <Col xs="10" className="information-col">{ this.props.shop.city }, { this.props.shop.address } </Col>
            </Row>
            <Row className="shop-information-row">
              <Col xs="1" className="information-icon-col">
                <FontAwesomeIcon icon={faEnvelope} className="information-icon"/>
              </Col>
              <Col xs="10" className="information-col">{ this.props.shop.email }</Col>
            </Row>
          </Card.Body>
          { this.props.isFavorite ? 
              <Card.Footer className="shop-card-footer">
                <Button id="remove-button" variant="danger" size="sm" onClick={ () => this.removeFromFavorite() }><FontAwesomeIcon icon={faTrash}/> Remove</Button>
              </Card.Footer>
          :
              <Card.Footer className="shop-card-footer">
                <Button id="like-button" variant="primary" size="sm" onClick={ () => this.like() }><FontAwesomeIcon icon={faThumbsUp}/> Like</Button>
                <Button id="dislike-button" variant="danger" size="sm"onClick={ () => this.dislike() }><FontAwesomeIcon icon={faThumbsDown}/> Dislike</Button>
              </Card.Footer>
          }
        </Card>
      
    )
  }
}

ShopCard.propTypes = {
  shop : PropTypes.object.isRequired,
  isFavorite : PropTypes.bool.isRequired,
  refreshData : PropTypes.func.isRequired
};