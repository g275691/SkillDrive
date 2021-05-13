import * as c from './constants';
import * as error from '../Constants/Errors';

export const step1FormsRequest = () => ({ type: c.SET_STEP1_FORMS_REQUEST });
export const step1FormsSuccess = data => ({ type: c.SET_STEP1_FORMS_SUCCESS, payload: data });
export const step1FormsFailure = error => ({ type: c.SET_STEP1_FORMS_FAILURE, payload: error })

export const setUserData = createAction(c.SET_USER_DATA);

export const submitFormsStep1 = data => {
    return (dispatch) => {
    dispatch(step1FormsRequest());
    fetch("http://localhost:8000/users/registration/step1", {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(data) })
    .then(response => {
        dispatch(step1FormsRequest())
        if(!response.ok) {
            return response.status == "401"
            ? (dispatch(step1FormsFailure(error.CODE_401))
            , dispatch(setErrMail(error.CODE_401))
            , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000) )
            : (dispatch(step1FormsFailure(error.CODE_500))
            , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000) )
        } else {
            dispatch(step1FormsSuccess())
            , dispatch(setUserData(data))
        }
    },
    err => {
        dispatch(step1FormsRequest());
        console.log(err);
        dispatch(step1FormsFailure(error.FAILED_TO_FETCH))
        , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000);
    })
}
}