import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpView from './views/signUpView/SignUpView';
import LoginView from './views/loginView/LoginView';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AppLayout from './views/appLayout/AppLayout';
import { routeLinks } from './utils/RouteLinks';

function App() {
  return (
    <Switch>
      <Route path="/" exact render={ () => <Redirect to = {routeLinks.LOGIN} />} />
      <Route path={ routeLinks.SIGN_UP } exact component={ SignUpView } />
      <Route path={ routeLinks.LOGIN } exact component={ LoginView } />
      <Route path={ routeLinks.NEARBY_SHOPS }  render={ (props) => <ProtectedRoute component={AppLayout} {...props} /> } />
    </Switch>
  );
}

export default App;
