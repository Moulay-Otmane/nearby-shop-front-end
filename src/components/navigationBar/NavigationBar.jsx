import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import NavbarIcon from '../../assets/images/navbar-icon.png'
import './NavigationBar.css';
import { routeLinks } from '../../utils/RouteLinks';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class NavigationBar extends Component {
    isCurrentPathName(pathName){
        return this.props.history.location.pathname === pathName;
    }

    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    
    render() {
        return (
            <Navbar fixed="top" bg="primary" variant="dark" expand="lg" className="nav-bar-style">
                <Navbar.Brand href={ routeLinks.NEARBY_SHOPS } className="navbar-brand-style">
                <img
                    alt=""
                    src={ NavbarIcon }
                    width="30"
                    height="30"
                    style={{  }}
                    />{' '}Shops
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={ routeLinks.NEARBY_SHOPS } className={"nav-link-style"+( this.isCurrentPathName(routeLinks.NEARBY_SHOPS)&&" current-path")}>Nearby shops</Nav.Link>
                        <Nav.Link href={ routeLinks.FAVORITES_SHOPS } className={"nav-link-style"+( this.isCurrentPathName(routeLinks.FAVORITES_SHOPS)&&" current-path")}>Favorites shops</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={this.logout}><FontAwesomeIcon icon={ faSignOutAlt }/> Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


