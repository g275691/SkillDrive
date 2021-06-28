import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';
import { useHistory } from "react-router-dom";

export const setCarPageRequest = createAction('SET_CAR_PAGE_REQUEST');
export const setCarPageSuccess = createAction('SET_CAR_PAGE_SUCCESS');
export const setCarPageFailure = createAction('SET_CAR_PAGE_FAILURE');

export const setCarPage = id => {
    return (dispatch) => {
        dispatch(setCarPageRequest(true));
        fetch(`http://localhost:8000/rent-car/car-page/${id}`)
            .then(response => {
            dispatch(setCarPageRequest(false));
            if(!response.ok) {
                dispatch(setCarPageFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(setCarPageFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json=>{
                    dispatch(setCarPageSuccess(json));
                })
                
            }
            },
            err => {
                dispatch(setCarPageRequest());
                setTimeout(() => { dispatch(setCarPageFailure(false)); }, 3000);
                dispatch(setCarPageFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }