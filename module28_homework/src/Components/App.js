import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import About from './About-page/About';
import Registration from '../Containers/Registration/Registration';
import Success from './Registr-page/success/Success';
import Questions from './Questions-page/Questions';
import NotFound from './Global/Page404/Page404';
import Home from './Home-page/Home';
import ResetPassword from '../Containers/ResetPass';
import RentPage from '../Containers/RentPage/RentPage';

const App = () => {


  return (
      <Switch>
        <Route path="users/:id" />
        <Route path="/rent-page" component={RentPage} />
        <Route path="/reset-pass" component={ResetPassword} />
        <Route path="/questions" component={Questions} />
        <Route path="/success" component={Success} />
        <Route path="/Registration" component={Registration} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
  );
}

export default App;