import { createAction } from "@reduxjs/toolkit";
import { getGeo } from "../config/getGeo";
import * as error from '../Constants/Errors';

export const setStep = createAction('SET_STEP');

// export const onAuthRequest = createAction('ON_AUTH_REQUEST');
// export const onAuthSuccess = createAction('ON_AUTH_SUCCESS');
// export const onAuthFailure = createAction('ON_AUTH_FAILURE');

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
                //dispatch(setStep1FormsSuccess(data));
                dispatch(setStep(2));
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

export const createCarRequest = createAction('CREATE_CAR_REQUEST');
export const createCarFailure = createAction('CREATE_CAR_FAILURE');
export const createCarSuccess = createAction('CREATE_CAR_SUCCESS');

export const createCar =  data => {
    return async (dispatch, getStore) => {
        let fullUserData = {...getStore().NewCar.step1Forms};
        fullUserData.options = getStore().NewCar.step2Forms;
        fullUserData.photosCars = getStore().NewCar.photosCars;
        fullUserData.photosCarsDocs = getStore().NewCar.photosCarsDocs;
        fullUserData.owner = localStorage.getItem("userMail");
        fullUserData.geo = await getGeo(getStore().NewCar.step1Forms.city);

        console.log(getGeo(getStore().NewCar.step1Forms.city));
        console.log(fullUserData);

        dispatch(createCarRequest());
        fetch("http://localhost:8000/rent-car/create", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
            body: JSON.stringify(fullUserData) })
            .then(response => {
            dispatch(createCarRequest());
            if(!response.ok) {
                dispatch(createCarFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(createCarFailure(false)); }, 2000);
            } else {
                dispatch(createCarSuccess());
            }
            },
            err => {
                dispatch(createCarRequest());
                setTimeout(() => { dispatch(createCarFailure(false)); }, 3000);
                dispatch(createCarFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }