import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const setStep = createAction('SET_STEP');

export const onAuthRequest = createAction('ON_AUTH_REQUEST');
export const onAuthSuccess = createAction('ON_AUTH_SUCCESS');
export const onAuthFailure = createAction('ON_AUTH_FAILURE');

// export const setStep1Forms = createAction('SET_STEP1_FORMS');
export const setStep1FormsRequest = createAction('SET_STEP1_FORMS_REQUEST');
export const setStep1FormsSuccess = createAction('SET_STEP1_FORMS_SUCCESS');
export const setStep1FormsFailure = createAction('SET_STEP1_FORMS_FAILURE');
export const setStep1Forms = data => {
    return (dispatch, getStore) => {
        dispatch(setStep1FormsRequest());
        fetch("http://localhost:8000/rent-car/step1", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
            body: JSON.stringify(data) })
            .then(response => {
            dispatch(setStep1FormsRequest());
            if(!response.ok) {

                dispatch(setStep1FormsFailure(error.CODE_500));
                setTimeout(() => { dispatch(setStep1FormsFailure(false)); }, 2000);
            } else {
                dispatch(setStep1FormsSuccess(data));
                dispatch(setStep(2))
            }
            },
            err => {
                dispatch(setStep1FormsRequest());
                setTimeout(() => { dispatch(setStep1FormsFailure(false)); }, 3000);
                dispatch(setStep1FormsFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }


export const setStep2Forms = createAction('SET_STEP2_FORMS');
export const setPhotosCars = createAction('SET_PHOTOS_CARS');
export const setPhotosCarsDocs = createAction('SET_PHOTOS_CARS_DOCS');

export const onAuth = data => {
    return (dispatch, getStore) => {
        dispatch(onAuthRequest());
        fetch("http://localhost:8000/users/auth/access", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
            body: JSON.stringify(data) })
            .then(response => {
            dispatch(onAuthRequest());
            if(!response.ok) {
                dispatch(onAuthFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(onAuthFailure(false)); }, 2000);
            } else {
                dispatch(onAuthSuccess());
            }
            },
            err => {
                dispatch(onAuthRequest());
                setTimeout(() => { dispatch(onAuthFailure(false)); }, 3000);
                dispatch(onAuthFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }