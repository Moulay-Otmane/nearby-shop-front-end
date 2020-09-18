import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../../components/loginForm/LoginForm";
import firstPageIcon from "../../assets/images/first-page-icon.png";
import nearbyShopBackgroundImg from "../../assets/images/nearby-shop-background-img.png";
import { Link } from "react-router-dom";
import './LoginView.css'

export default class LoginView extends Component {
    render(){
        return (
            <Container className="background-img-container" style={{ background: `url(${nearbyShopBackgroundImg})`}} fluid>
                <Container className="background-img-filter"  fluid={true}>
                    <Row style={{ justifyContent:"center" }}>
                        <Col md lg="6" id="application-img-container">
                            <img src={firstPageIcon} alt="Nearby shops" class="img-fluid"/> 
                        </Col>
                        <Col md lg="4" id="login-form-col">
                            <Container style={{ padding:"3%", height:"100%"}}>
                                <LoginForm history={this.props.history}/>
                                <span id="sign-up-redirection-link"> Not a member ? <Link to="/sign-up">Sign up now</Link></span>
                            </Container>           
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}