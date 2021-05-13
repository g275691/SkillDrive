import React, { Fragment } from 'react';
import Header from '../global/header';
import Footer from '../global/Footer';
import DescrContacts from './DescrContacts';
import Team from './Team';

const About = () => (
  <Fragment>
    <Header />
    <DescrContacts />
    <Team />
    <Footer />
  </Fragment>
)

export default About;