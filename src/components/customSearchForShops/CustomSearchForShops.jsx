import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Button, Form, FormGroup, FormControl, Container } from 'react-bootstrap';
import cityService from '../../services/cityService/CityService';
import './CustomSearchForShops.css';
import { faTimesCircle, faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

export default class CustomSearchForShops extends Component {

    constructor(props){
        super(props);
        this.state = {
            city:'',
            location: null,
            cityNames: [],
            isFormValid: true,
            selectedAddress:'',
            addressList:[]
        }
    }

    setCitiesName(){
        this.setState({cityNames : []});
        cityService.getCities()
        .then( cityList => {
            this.setState({cityNames : cityList.map(city => city.name)});
        }).catch(error => {
            toast.error("Error while retrieving cities list")
        })
    }

    componentDidMount(){
        this.setCitiesName();
    }

    setAddressList(targetCity){
        this.setState({selectedAddress:'',addressList: []});
        if(targetCity.length > 0){

            cityService.getCities()
            .then( cityList => {
                this.setState({addressList : cityList.filter(city => city.name === targetCity).shift().addressList});
            }).catch(error => {
                toast.error("Error while retrieving cities list")
            })
        }
    }

    isSearchFormValid(){
        return (this.state.city.length > 0 && this.state.location != null)
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.isSearchFormValid()){
            this.props.searchShopsByCustomAddress(this.state.location);
            this.props.closeForm();
        }
    }

  render() {
    return (
        <Container id="custom-search-for-shop-form-container">
            <div id="close-circle-button" className="float-right" onClick={() => this.props.closeForm()}><FontAwesomeIcon icon={ faTimesCircle } /></div>
            <Form onSubmit={ (event) => this.handleSubmit(event) }>
                <Row id="custom-search-for-shop-form-row">
                    <Col md lg="4">
                        <FormGroup className="form-group-style">
                            <label className="form-control-label">City</label>
                            <FormControl 
                                as="select" 
                                name="city" 
                                className="form-control-input"
                                value={this.state.city}
                                onChange={event => (this.setState({city: event.target.value}), this.setAddressList(event.target.value))}
                                >
                                <option value="" disabled hidden>Choose a city ...</option>
                                {
                                    this.state.cityNames.map(cityName => <option value={cityName} key={cityName}> {cityName} </option> )
                                }

                            </FormControl>
                        </FormGroup>                                    
                    </Col>           
                    <Col md lg="5">
                        <FormGroup className="form-group-style">
                            <label className="form-control-label">Address</label>
                            <FormControl 
                                as="select" 
                                name="location" 
                                className="form-control-input"
                                value={this.state.selectedAddress}
                                onChange={event =>this.setState({location:JSON.parse(event.target.value).location, selectedAddress: event.target.value})}
                                >
                                <option value="" disabled hidden>Choose an address ...</option>
                                {
                                    this.state.addressList.map(element => <option value={JSON.stringify(element)} key={element.addressLine}> {element.addressLine} </option>  )
                                }
                            </FormControl>
                        </FormGroup>    
                    </Col>
                    <Col md lg="2">
                        <Row style={{height:"100%"}}>
                            <Button type="submit" variant="primary" disabled={ !this.isSearchFormValid() } style={{ margin:"auto"}}>
                                <FontAwesomeIcon icon={faSearchLocation}/> Search
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
  }
}

CustomSearchForShops.propTypes = {
    searchShopsByCustomAddress : PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired
}
