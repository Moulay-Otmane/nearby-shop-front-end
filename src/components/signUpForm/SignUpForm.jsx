import React, { Component } from "react";
import { Form, FormGroup, FormControl, Col, Container, Row, Button } from "react-bootstrap";
import './SignUpForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import userService from '../../services/userService/UserService';
import cityService from '../../services/cityService/CityService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default class SignUpForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            city: '',
            location:null,
            selectedAddress:'',
            password : '',
            passwordConfirmation:'',
            isFormValid: true,
            addressList:[],
            cityNames:[],
            isEmailValid:true,
            isPasswordValid:true,
            isCityValid:true,
            isAddressValid:true,
            doesPasswordsMatch:true,
            emailError:'',
            isWaiting: false
        }
    }

    componentDidMount(){
        this.setCitiesName();
    }

    resetSignUpForm(){
        this.setState({
            email : '',
            city: '',
            location:null,
            selectedAddress:'',
            password : '',
            passwordConfirmation:'',
            isFormValid: true,
            addressList:[],
            cityNames:[],
            isEmailValid:true,
            isPasswordValid:true,
            isCityValid:true,
            isAddressValid:true,
            doesPasswordsMatch:true,
            emailError:'',
            isWaiting: false
        })
        this.setCitiesName();
    }

    validateSignUpForm(){
        const emailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$";
        let isFormValid = true;
        if(!this.state.email.match(emailRegex)){isFormValid=false ;this.setState({isEmailValid:false, emailError: 'Enter a valid email'});}
        if(this.state.password.length < 8){isFormValid=false ;this.setState({isPasswordValid:false});}
        else if(this.state.password !== this.state.passwordConfirmation){isFormValid=false ;this.setState({doesPasswordsMatch:false});}
        if(!this.state.city.length > 0){isFormValid=false ;this.setState({isCityValid:false});}
        if(this.state.location === null){isFormValid=false ;this.setState({isAddressValid:false});}

        return isFormValid;
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

    handleSubmit(event){
        event.preventDefault();
        this.setState({isWaiting:true})
        if(this.validateSignUpForm()){
            const user = {
                email:this.state.email,
                password: this.state.password,
                city: this.state.city,
                location: this.state.location
            }
            
            userService.signUp(user)
            .then(()=>{ 
                this.setState({isWaiting:false});
                this.resetSignUpForm();
                toast.success("Your account was created successfully");
             })
            .catch((error)=>{ 
                this.setState({isWaiting:false});
                error.content.json().then(responseBody=>{
                    if(responseBody.exceptionMessage && responseBody.exceptionMessage === "EMAIL_ALREADY_USED"){
                        this.setState({isEmailValid:false, emailError: "Email already used"})
                    }else{
                        toast.error("A problem occure during account creation")
                    }
                })
             })
        }else{
            this.setState({isWaiting:false})
        }
    }

    render(){
        return (
            <React.Fragment>
                <ToastContainer className="notification-component"/>
                <Form onSubmit={event => this.handleSubmit(event)} noValidate>
                    <Row className="form-row-style">
                        <BarLoader 
                            height={5}
                            width={'100%'}
                            color={'#5260ff'}
                            loading={this.state.isWaiting}
                        />
                        <Col md lg="12" className={this.state.isWaiting?"disabled-container":""}><Link id="link-to-login-page" to="/"> Go to login page <FontAwesomeIcon icon={faArrowCircleRight}/> </Link></Col>
                        <div className="w-100"/>
                        <Col md lg="10">
                            <Row id="sign-up-container-title">
                                <h1>Sign up</h1>
                            </Row>
                        </Col>
                        <div className="w-100"/>
                        <Col md lg="5" id="user-info-col" className={this.state.isWaiting?"disabled-container":""}>
                            <Container id="user-info-container">
                                <FormGroup className="form-group-style">
                                    <label className="form-control-label">Email</label>
                                    <FormControl
                                        placeholder="name@example.com"
                                        className="form-control-input"
                                        autoFocus
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={event => this.setState({isEmailValid : true, email: event.target.value})}
                                    />
                                    {!this.state.isEmailValid?
                                        <Form.Control.Feedback type="invalide" className="form-controle-feedback-invalid"><small><FontAwesomeIcon icon={faExclamationCircle}/> { this.state.emailError } </small></Form.Control.Feedback>
                                        :<React.Fragment/>
                                    }
                                </FormGroup>
                                <FormGroup className="form-group-style">
                                    <label className="form-control-label">Password</label>
                                    <FormControl
                                        placeholder="Password"
                                        className="form-control-input"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={event => this.setState({isPasswordValid : true, password: event.target.value})}
                                    />
                                    {!this.state.isPasswordValid ?
                                        <Form.Control.Feedback type="invalide" className="form-controle-feedback-invalid"><small><FontAwesomeIcon icon={faExclamationCircle}/> Enter a valid password (use 7 characters or more)</small></Form.Control.Feedback>
                                        :<React.Fragment/>
                                    }
                                </FormGroup>
                                <FormGroup className="form-group-style">
                                    <label className="form-control-label">Password confirmation</label>
                                    <FormControl
                                        placeholder="confirm password"
                                        className="form-control-input"
                                        name="passwordConfirmation"
                                        type="password"
                                        value={this.state.passwordConfirmation}
                                        onChange={event => this.setState({doesPasswordsMatch : true, passwordConfirmation: event.target.value})}
                                    />
                                    {!this.state.doesPasswordsMatch?
                                        <Form.Control.Feedback type="invalide" className="form-controle-feedback-invalid"><small><FontAwesomeIcon icon={faExclamationCircle}/> Passwords didn't match</small></Form.Control.Feedback>
                                        :<React.Fragment/>
                                    }
                                </FormGroup>
                            </Container>
                        </Col>
                        <Col md lg="5" id="address-info-col" className={this.state.isWaiting?"disabled-container":""}>
                            <Container id="address-container">
                                <FormGroup className="form-group-style">
                                    <label className="form-control-label">City</label>
                                    <FormControl 
                                        as="select" 
                                        name="city" 
                                        className="form-control-input"
                                        value={this.state.city}
                                        onChange={event => (this.setState({isCityValid : true, city: event.target.value}), this.setAddressList(event.target.value))}
                                        >
                                        <option value="" disabled hidden>Choose a city ...</option>
                                        {
                                            this.state.cityNames.map(cityName => <option value={cityName} key={cityName}> {cityName} </option> )
                                        }
                                    </FormControl>
                                    {!this.state.isCityValid?
                                        <Form.Control.Feedback type="invalide" className="form-controle-feedback-invalid"><small><FontAwesomeIcon icon={faExclamationCircle}/> Select a valid city </small></Form.Control.Feedback>
                                        :<React.Fragment/>
                                    }
                                </FormGroup>
                                <FormGroup className="form-group-style">
                                    <label className="form-control-label">Address</label>
                                    <FormControl 
                                        as="select" 
                                        name="location" 
                                        className="form-control-input"
                                        value={this.state.selectedAddress}
                                        onChange={event =>this.setState({isAddressValid : true, location:JSON.parse(event.target.value).location, selectedAddress: event.target.value})}
                                        >
                                        <option value="" disabled hidden>Choose an address ...</option>
                                        {
                                            this.state.addressList.map(element => <option value={JSON.stringify(element)} key={element.addressLine}> {element.addressLine} </option>  )
                                        }
                                    </FormControl>
                                    {!this.state.isAddressValid?
                                        <Form.Control.Feedback type="invalide" className="form-controle-feedback-invalid"><small><FontAwesomeIcon icon={faExclamationCircle}/> Select a valid address </small></Form.Control.Feedback>
                                        :<React.Fragment/>
                                    }
                                </FormGroup>
                            </Container>
                        </Col>
                        <div className="w-100"/>
                        <Col md lg="10">
                            <Row id="sign-up-button-container" className={this.state.isWaiting?"disabled-container":""}>
                                <Col md lg="3">
                                    <Button type="submit" variant="primary" block>Create account</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}