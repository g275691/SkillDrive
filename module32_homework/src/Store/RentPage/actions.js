import { createAction } from "@reduxjs/toolkit";
import { callWithToken } from "../../Components/Global/CallApi/chectToken";
import * as error from '../Constants/Errors';

export const setCarsList = createAction('SET_CAR_LIST');
export const setCarsCategory = createAction('SET_CARS_CATEGORY');
export const setCarsCity = createAction('SET_CARS_CITY');

export const setSecondDate = createAction('SET_SECOND_DATE');

export const sortCarsListRequest = createAction('SORT_CARS_LIST_REQUEST');
export const sortCarsListSuccess = createAction('SORT_CARS_LIST_SUCCESS');
export const sortCarsListFailure = createAction('SORT_CARS_LIST_FAILURE');

export const setFirstCarLocation = createAction('SET_FIRST_CAR_LOCATION');

export const setFinderHeading = createAction("SET_FINDER_HEADING");

export const sortCarsList = (getJson, data) => {
    let findStartRent = new Date(data.startRent).getTime();
    let findEndRent = new Date(data.endRent).getTime();

    return (dispatch, getStore) => {
        console.log(data)
        dispatch(sortCarsListRequest());
        fetch(`http://localhost:8000/rent-car?city=${data.city}&category=${data.category}&startRent=${findStartRent}&endRent=${findEndRent}&sort=${data.sort}`)
            .then(response => {
            dispatch(sortCarsListRequest());
            if(!response.ok) {
                dispatch(sortCarsListFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(sortCarsListFailure(false)); }, 2000);
            } else {
                dispatch(sortCarsListSuccess());
                response.json()
                .then(json => {
                    getJson(json);
                    dispatch(setFirstCarLocation(json[0].geo))
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