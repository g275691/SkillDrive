import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const getUsersRequest = createAction('GET_USERS_REQUEST');
export const getUsersSuccess = createAction('GET_USERS_SUCCESS');
export const getUsersFailure = createAction('GET_USERS_FAILURE');

export const getUsers = () => {
    return (dispatch, getStore) => {
        dispatch(getUsersRequest());
        fetch("http://localhost:8000/users/")
            .then(response => {
            dispatch(getUsersRequest());
            if(!response.ok) {
                dispatch(getUsersFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(getUsersFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    dispatch(getUsersSuccess(json))})
                }
            },
            err => {
                dispatch(getUsersRequest());
                setTimeout(() => { dispatch(getUsersFailure(false)); }, 3000);
                dispatch(getUsersFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }

export const getChatRequest = createAction('GET_CHAT_REQUEST');
export const getChatSuccess = createAction('GET_CHAT_SUCCESS');
export const getChatFailure = createAction('GET_CHAT_FAILURE');  

export const getChat = toUser => {
    const fromUser = localStorage.getItem("userMail");
    return (dispatch, getStore) => {
        dispatch(getChatRequest());
        fetch(`http://localhost:8000/messages/chat?fromUser=${fromUser}&toUser=${toUser}`)
            .then(response => {
            dispatch(getChatRequest());
            if(!response.ok) {
                dispatch(getChatFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(getChatFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    dispatch(getChatSuccess(json))})
                
            }
            },
            err => {
                dispatch(getChatRequest());
                setTimeout(() => { dispatch(getChatFailure(false)); }, 3000);
                dispatch(getChatFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }