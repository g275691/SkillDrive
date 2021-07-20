import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const getUsersRequest = createAction('GET_USERS_REQUEST');
export const getUsersSuccess = createAction('GET_USERS_SUCCESS');
export const getUsersFailure = createAction('GET_USERS_FAILURE');

export const getUsers = () => {
    return (dispatch, getStore) => {
        dispatch(getUsersRequest());
        fetch(`http://localhost:8000/users?mail=${localStorage.getItem("userMail")}`)
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

export const getChatHistoryRequest = createAction('GET_CHAT_HISTORY_REQUEST');
export const getChatHistorySuccess = createAction('GET_CHAT_HISTORY_SUCCESS');
export const getChatHistoryFailure = createAction('GET_CHAT_HISTORY_FAILURE');  

export const fromUser = createAction('FROM_USER');
export const toUser = createAction('TO_USER');
export const toUserName = createAction('TO_USER_NAME');
export const setChatMessage = createAction('SET_CHAT_MESSAGE');

export const getChatHistory = (data, name) => {
    return (dispatch, getStore) => {
        dispatch(getChatHistoryRequest());
        fetch(`http://localhost:8000/messages/chat?fromUser=${localStorage.getItem("userMail")}&toUser=${data}`)
            .then(response => {
            dispatch(getChatHistoryRequest());
            if(!response.ok) {
                dispatch(getChatHistoryFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(getChatHistoryFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    dispatch(getChatHistorySuccess(json))})
                    
                    dispatch(fromUser(localStorage.getItem("userMail")));
                    dispatch(toUser(data));
                    dispatch(toUserName(name))
            }
            },
            err => {
                dispatch(getChatRequest());
                setTimeout(() => { dispatch(getChatHistoryFailure(false)); }, 3000);
                dispatch(getChatFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }