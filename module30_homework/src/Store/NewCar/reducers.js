import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const NewCar = createReducer( defaultState, {
    [actions.setStep]: (state, action) => { state.isStep = action.payload; },

    [actions.setStep1FormsRequest]: (state) => { 
        state.buttonLoad = state.buttonLoad ? false : true
    },
    [actions.setStep1FormsSuccess]: (state, action) => { 
        { state.step1Forms = action.payload; }
    },
    [actions.setStep2Forms]: (state, action) => { 
        { state.step2Forms = action.payload; }
    },
    [actions.setStep1FormsFailure]: (state, action) => { 
        state.warning = action.payload;
    },


    [actions.setPhotosCars]: (state, action) => { state.photosCars = action.payload },
    [actions.setPhotosCarsDocs]: (state, action) => { state.photosCarsDocs = action.payload }
})