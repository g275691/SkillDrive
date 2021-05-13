import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import './styles/base.scss';

import App from "./Components/app";


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
document.getElementById("root"));