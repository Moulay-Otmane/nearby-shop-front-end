import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { RingLoader} from 'react-spinners';
import './LoadingView.css';

export default class LoadingView extends Component{

    render(){
        return(
            <Container id="loading-view-container" fluid>
                <h1 id="loading-view-title">Loading ...</h1>
                <Container id="clip-loader-container" fluid>
                    <RingLoader color={'#5260ff'} size={200} loading={true}/>
                </Container>
            </Container>
        )
    }
}