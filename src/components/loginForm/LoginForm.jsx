import React, { Component } from "react";
import authenticationService from '../../services/authenticationService/AuthenticationService'
import { FormControl, FormGroup, Button, Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';
import { BarLoader } from "react-spinners";

export default class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            isFormValid: true,
            isWaiting:false
        }
    }

    validateLoginForm(){
        const emailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$";
        const isUserInfosValid = this.state.email.length>0 
        && this.state.email.match(emailRegex)
        && this.state.password.length > 7;

        this.setState({isFormValid : isUserInfosValid});
        return isUserInfosValid;
    }

    login(event){
        event.preventDefault();
        this.setState({isWaiting:true});
        if(this.validateLoginForm()){
            const loginInformations = {
                email : this.state.email,
                password : this.state.password,
            }

            authenticationService.authenticate(loginInformations)
            .then( generatedToken => {
                localStorage.setItem('token',generatedToken.token)
                this.setState({isWaiting:false});
                this.props.history.push('/nearby-shops')
            }).catch(error => {
                this.setState({isFormValid:false, password:'', isWaiting:false});
            });
        }else{
            this.setState({isWaiting:false});
        }
    }

    render(){
        return(
            <Container>
                <BarLoader
                    height={5}
                    width={'100%'}
                    color={'#5260ff'}
                    loading={this.state.isWaiting}
                />
                <h1 id="sign-in-label">Sign in</h1>
                {!this.state.isFormValid ? <div id="login-form-invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle}/> invalid username or password</div>:<React.Fragment/>}
                <Form onSubmit={ event => this.login(event) } className={this.state.isWaiting?"disabled-container":""}>
                    <FormGroup className="form-group-style">
                        <label className="form-control-label">Username</label>
                        <FormControl
                            placeholder="name@example.com"
                            className="form-control-input"
                            autoFocus
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={event => this.setState({isFormValid : true, email: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup className="form-group-style">
                        <label className="form-control-label">Password</label>
                        <FormControl
                            placeholder="Password"
                            className="form-control-input"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={event => this.setState({isFormValid : true, password: event.target.value})}
                        />
                    </FormGroup>
                    <Button type="submit" variant="primary" block> Log in</Button>
                </Form>
            </Container>
        )
    }
}