import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import './styles/base.scss';

import App from "./Components/app";
import rootReducer from './Store/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>, 
document.getElementById("root"));