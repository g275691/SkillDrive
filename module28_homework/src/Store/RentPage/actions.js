import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const setCarsList = createAction('SET_CAR_LIST');
export const setCarsCategory = createAction('SET_CARS_CATEGORY');
export const setCarsCity = createAction('SET_CARS_CITY');

export const setSecondDate = createAction('SET_SECOND_DATE');

export const sortCarsListRequest = createAction('SORT_CARS_LIST_REQUEST');
export const sortCarsListSuccess = createAction('SORT_CARS_LIST_SUCCESS');
export const sortCarsListFailure = createAction('SORT_CARS_LIST_FAILURE');

export const setFirstCarLocation = createAction('SET_FIRST_CAR_LOCATION');



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
                response.json()
                .then(json => {
                    getJson(json);
                    dispatch(setFirstCarLocation(json[0].geo))
                    let carsCity = [], carsCategory = [];
                    // json.forEach(el => {
                    //     carsCity.push(el.city);
                    //     carsCategory.push(el.category); 
                    // })

                    // console.log(carsCity)


                    // dispatch(setCarsCategory([...new Set(carsCategory)]));
                    // dispatch(setCarsCity([...new Set(carsCity)]))

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