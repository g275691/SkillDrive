export const CHANGE_LOGIN_MAIL_TEXT = 'CHANGE_LOGIN_MAIL_TEXT';
export const CHANGE_LOGIN_PASSWORD_TEXT = 'CHANGE_LOGIN_PASSWORD_TEXT';

export const CHANGE_LOGIN_BUTTON_ACTIVITY = 'CHANGE_LOGIN_BUTTON_ACTIVITY';
export const CHANGE_LOGIN_BUTTON_LOAD = 'CHANGE_LOGIN_BUTTON_LOAD';

export const SET_FORM_FOR_SEND = 'SET_FORM_FOR_SEND';
export const SET_FORM_MAIL_SENT = 'SET_FORM_MAIL_SENT';

export const SET_LOGIN_ERR_MAIL = 'SET_LOGIN_ERR_MAIL';
export const SET_LOGIN_ERR_PASSWORD = 'SET_LOGIN_ERR_PASSWORD';
export const SET_LOGIN_ERR_SERVER = 'SET_LOGIN_ERR_SERVER';

export const LOGIN_OPEN_OR_CLOSE = 'LOGIN_OPEN_OR_CLOSE';

export const setLoginMail = (text) => ({
    type: CHANGE_LOGIN_MAIL_TEXT,
    payload: text
})

export const setLoginPassword = (text) => ({
    type: CHANGE_LOGIN_PASSWORD_TEXT,
    payload: text
})

export const setLoginButtonActive = (text) => ({
    type: CHANGE_LOGIN_BUTTON_ACTIVITY,
    payload: text
})

export const setLoginButtonLoad = (boolean) => ({
    type: CHANGE_LOGIN_BUTTON_LOAD,
    payload: boolean
})

export const setFormMailSent = (boolean) => ({
    type: SET_FORM_MAIL_SENT,
    payload: boolean
})

export const setFormForSend = (boolean) => ({
    type: SET_FORM_FOR_SEND,
    payload: boolean
})

export const setLoginErrMail = (boolean) => ({
    type: SET_LOGIN_ERR_MAIL,
    payload: boolean
})

export const setLoginErrPassword = (boolean) => ({
    type: SET_LOGIN_ERR_PASSWORD,
    payload: boolean
})

export const setLoginErrServer = (boolean) => ({
    type: SET_LOGIN_ERR_SERVER,
    payload: boolean
})

export const closeLogin = (boolean) => ({
    type: LOGIN_OPEN_OR_CLOSE,
    payload: boolean
})