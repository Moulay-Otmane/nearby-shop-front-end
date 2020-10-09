import authenticationService from '../../services/authenticationService/AuthenticationService'
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import LoadingView from '../../views/loadingView/LoadingView';
import LoginView from '../../views/loginView/LoginView';

const ProtectedRoute = ({component : Component}, ...rest) => {
    
    const [isTokenValid, setTokenValidity] = useState(false);
    const [wasTokenValidated, setTokenValidated] = useState(false);

    useEffect(()=>{
        authenticationService.checkTokenValidity()
        .then((response) => {
            setTokenValidated(true);
            setTokenValidity(response);
        })
        .catch(()=>{
            setTokenValidated(true);
        });
    },[]);

    return <Route render={(props)=> wasTokenValidated ?  (isTokenValid ? <Component {...props}/> : <LoginView {...props}/> ) : <LoadingView /> } {...rest}/>
}

export default ProtectedRoute;