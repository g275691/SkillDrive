import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const RentPage = createReducer( defaultState, {
    [actions.closeLogin]: (state, action) => { state.loginIsClose = action.payload; },
    [actions.setCarsList]: (state, action) => { state.carsList = action.payload; },
    [actions.setCarsListFilter]: (state, action) => { state.carsListFilter = action.payload; },

    [actions.sortCarsListRequest]: (state) => {
        state.buttonLoad = state.buttonLoad ? false : true
    },
    [actions.sortCarsListSucces]: (state) => {
        
    },
    
})