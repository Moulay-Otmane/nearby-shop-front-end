import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUpView from './views/signUpView/SignUpView';
import LoginView from './views/loginView/LoginView';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AppLayout from './views/appLayout/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={ () => <Redirect to = "/login" />} />
        <Route path="/sign-up" component={ SignUpView } />
        <Route path="/login" component={ LoginView } />
        <Route path="/shops" render={ (props) => <ProtectedRoute component={AppLayout} {...props} /> } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
