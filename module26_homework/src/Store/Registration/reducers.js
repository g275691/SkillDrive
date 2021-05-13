import { CHANGE_NAME_TEXT, CHANGE_MAIL_TEXT, CHANGE_PASSWORD_TEXT, 
    CHANGE_BIRTHDAY_TEXT, CHANGE_PHONE_TEXT, CHANGE_PASSPORT_TEXT,
    CHANGE_PASSPORT_DATE_TEXT, CHANGE_PASSPORT_ORGAN_TEXT, CHANGE_PASSPORT_CODE_TEXT,
    CHANGE_DRIVER_TEXT, CHANGE_DRIVER_DATE_TEXT, CHANGE_ALL_VALID, CHANGE_ERR_MAIL_TEXT, 
    CHANGE_REG_BUTTON_ACTIVITY, CHANGE_BUTTON_LOAD, CHANGE_REDIRECT, CHANGE_WARNING_TEXT, 
} 
from "./actions";

const defaultState = {
    name: '',
    mail: '',
    password: '',
    birthday: '',
    phone: '',
    passport: '',
    passportDate: '',
    passportOrgan: '',
    passportCode: '',
    driver: '',
    driverDate: '',
    warning: null,
    regButtonActive: false,
    buttonLoad: false,
    redirect: false,
    isValid: false,
    errMail: null,
}

export const registration = (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_NAME_TEXT:
            return {
                ...state,
                name: action.payload,
            };
        case CHANGE_MAIL_TEXT:
            return {
                ...state,
                mail: action.payload,
            };
        case CHANGE_PASSWORD_TEXT:
            return {
                ...state,
                password: action.payload,
            };
        case CHANGE_BIRTHDAY_TEXT:
            return {
                ...state,
                birthday: action.payload,
            };
        case CHANGE_PHONE_TEXT:
            return {
                ...state,
                phone: action.payload,
            };
        case CHANGE_PASSPORT_TEXT:
            return {
                ...state,
                passport: action.payload,
            };
        case CHANGE_PASSPORT_DATE_TEXT:
            return {
                ...state,
                passportDate: action.payload,
            };
        case CHANGE_PASSPORT_ORGAN_TEXT:
            return {
                ...state,
                passportOrgan: action.payload,
            }; 
        case CHANGE_PASSPORT_CODE_TEXT:
            return {
                ...state,
                passportCode: action.payload,
            };
        case CHANGE_DRIVER_TEXT:
            return {
                ...state,
                driver: action.payload,
            };
        case CHANGE_DRIVER_DATE_TEXT:
            return {
                ...state,
                driverDate: action.payload,
            };    

        case CHANGE_REG_BUTTON_ACTIVITY:
            return {
                ...state,
                regButtonActive: action.payload,
            };
        case CHANGE_BUTTON_LOAD:
            return {
                ...state,
                buttonLoad: action.payload,
            };
        case CHANGE_REDIRECT:
            return {
                ...state,
                redirect: action.payload,
            };
        case CHANGE_ALL_VALID:
            return {
                ...state,
                isValid: action.payload,
            };
        case CHANGE_WARNING_TEXT:
            return {
                ...state,
                warning: action.payload,
            };
        case CHANGE_ERR_MAIL_TEXT:
            return {
                ...state,
                errMail: action.payload,
            };
    default: return state;
        }
}