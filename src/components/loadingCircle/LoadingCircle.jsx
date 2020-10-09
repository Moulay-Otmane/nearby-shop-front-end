import React, { Component } from 'react';
import './LoadingCircle.css';
import { Container } from 'react-bootstrap';
import { RingLoader } from 'react-spinners';


export default class LoadingCircle extends Component {
  render() {
    return (
        <Container id="loading-circle"> 
            <h3 id="loading-circle-title">Loading ...</h3>
            <Container id="ring-loader-container" fluid>
                <RingLoader color={'#5260ff'} size={150} loading={true}/>
            </Container>
        </Container>
    )
  }
}
