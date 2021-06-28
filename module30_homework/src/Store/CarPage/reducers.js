import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const CarPage = createReducer( defaultState, {
    [actions.setCarPageSuccess]: (state, action) => { 
        state.carPage = action.payload; 
        state.isSuccess = true;
    },
    [actions.setCarPageRequest]: (state, action) => { 
        state.buttonLoad = action.payload
    },
})