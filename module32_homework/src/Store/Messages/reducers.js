import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const Messages = createReducer( defaultState, {
    [actions.getUsersSuccess]: (state, action) => { state.users = action.payload; },
    [actions.getChatSuccess]: (state, action) => { state.chat = action.payload; },
})