import { CHANGE_LOGIN_MAIL_TEXT, CHANGE_LOGIN_PASSWORD_TEXT, 
    CHANGE_LOGIN_BUTTON_ACTIVITY, CHANGE_LOGIN_BUTTON_LOAD, 
    SET_FORM_FOR_SEND, SET_FORM_MAIL_SENT,
    SET_LOGIN_ERR_MAIL, SET_LOGIN_ERR_PASSWORD, SET_LOGIN_ERR_SERVER,
    LOGIN_OPEN_OR_CLOSE
     } 
from "./actions";

const defaultState = {
    mailLogin: '',
    passwordLogin: '',
    buttonActiveLogin: false,
    buttonLoadLogin: false,
    isFormForSend: false,
    isFormMailSent: false,
    errMailLogin: null,
    errPasswordLogin: null,
    errServerLogin: '',
    loginIsClose: true
}

export const login = (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_LOGIN_MAIL_TEXT:
            return {
                ...state,
                mailLogin: action.payload,
            };
        case CHANGE_LOGIN_PASSWORD_TEXT:
            return {
                ...state,
                passwordLogin: action.payload,
            };
        case CHANGE_LOGIN_BUTTON_ACTIVITY:
            return {
                ...state,
                buttonActiveLogin: action.payload,
            };
        case CHANGE_LOGIN_BUTTON_LOAD:
            return {
                ...state,
                buttonLoadLogin: action.payload,
            };
        case SET_FORM_FOR_SEND:
            return {
                ...state,
                isFormForSend: action.payload,
            };
        case SET_FORM_MAIL_SENT:
            return {
                ...state,
                isFormMailSent: action.payload,
            };
        case SET_LOGIN_ERR_MAIL:
            return {
                ...state,
                errMailLogin: action.payload,
            };
        case SET_LOGIN_ERR_PASSWORD:
            return {
                ...state,
                errPasswordLogin: action.payload,
            };
        case SET_LOGIN_ERR_SERVER:
            return {
                ...state,
                errServerLogin: action.payload,
            };
        case LOGIN_OPEN_OR_CLOSE:
            return {
                ...state,
                loginIsClose: action.payload,
            };
    default: return state;
        }
}