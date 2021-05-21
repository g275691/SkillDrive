import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const setCarsList = createAction('SET_CAR_LIST');
export const setCarsListFilter = createAction('SET_CAR_LIST_FILTER');

export const sortCarsListRequest = createAction('SORT_CARS_LIST_REQUEST');
export const sortCarsListSuccess = createAction('SORT_CARS_LIST_SUCCESS');
export const sortCarsListFailure = createAction('SORT_CARS_LIST_FAILURE');

export const sortCarsList = (getJson, url) => {
    return (dispatch, getStore) => {
        dispatch(sortCarsListRequest());
        fetch(url)
            .then(response => {
            dispatch(sortCarsListRequest());
            if(!response.ok) {
                dispatch(sortCarsListFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(sortCarsListFailure(false)); }, 2000);
            } else {
                dispatch(sortCarsListSuccess());
                console.log(response)
                response.json()
                .then(json => {
                    getJson(json)
                })
            }
            },
            err => {
                dispatch(sortCarsListRequest());
                setTimeout(() => { dispatch(sortCarsListFailure(false)); }, 3000);
                dispatch(sortCarsListFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }