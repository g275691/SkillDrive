import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const NewCar = createReducer( defaultState, {
    [actions.closeLogin]: (state, action) => { state.loginIsClose = action.payload; },
})