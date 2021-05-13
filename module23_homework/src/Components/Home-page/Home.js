import React, { Fragment } from 'react';
import Header from '../global/header';
import Footer from '../global/Footer';
import Heading from './Heading';
import Description from './Description';
import RentRule from './RentRule';
import Profit from './Profit';
import Review from './Review';
import Cta from './Cta';

const Home = () => (
    <Fragment>
        <Header isMain="something"/>
        <Heading />
        <Description />
        <RentRule />
        <Profit />
        <Review />
        <Cta />
        <Footer />
  </Fragment>
);

export default Home;