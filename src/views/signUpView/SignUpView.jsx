import React, { Component } from "react";
import { Container } from "react-bootstrap";
import SignUpForm from "../../components/signUpForm/SignUpForm";
import nearbyShopBackgroundImg from "../../assets/images/nearby-shop-background-img.png";
import './SignUpView.css';

export default class SignUpView extends Component{
    render(){
        return (
            <Container className="background-img-container" style={{ background: `url(${nearbyShopBackgroundImg})`}} fluid>
                <Container className="background-img-filter" fluid={true}>
                    <Container id="sign-up-form-view">
                        <SignUpForm />
                    </Container>
                </Container>
            </Container>
        )
    }
}