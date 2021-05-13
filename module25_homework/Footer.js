import React from 'react';
import {
     Switch,
     Route,
 } from "react-router-dom";
import NotFound from './NotFound'
import Home from './Home'
import Header from '../global/Header';
import Footer from '../global/Footer';

const Footer = () => {
     let [active, setActive] = React.useState(false);
     const handleClick = () => {
         setActive(active = true)
     }
     return (
        <Fragment>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} /> 
        </Switch>
        <Footer />
        </Fragment>
     )
 }
  
export default Footer;
 