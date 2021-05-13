export const CHANGE_NAME_TEXT = 'CHANGE_NAME_TEXT';
export const CHANGE_MAIL_TEXT = 'CHANGE_MAIL_TEXT';
export const CHANGE_PASSWORD_TEXT = 'CHANGE_PASSWORD_TEXT';
export const CHANGE_BIRTHDAY_TEXT = 'CHANGE_BIRTHDAY_TEXT';
export const CHANGE_PHONE_TEXT = 'CHANGE_PHONE_TEXT';
export const CHANGE_PASSPORT_TEXT = 'CHANGE_PASSPORT_TEXT';
export const CHANGE_PASSPORT_DATE_TEXT = 'CHANGE_PASSPORT_DATE_TEXT';
export const CHANGE_PASSPORT_ORGAN_TEXT = 'CHANGE_PASSPORT_ORGAN_TEXT';
export const CHANGE_PASSPORT_CODE_TEXT = 'CHANGE_PASSPORT_CODE_TEXT';
export const CHANGE_DRIVER_TEXT = 'CHANGE_DRIVER_TEXT';
export const CHANGE_DRIVER_DATE_TEXT = 'CHANGE_DRIVER_DATE_TEXT';

export const CHANGE_REG_BUTTON_ACTIVITY = 'CHANGE_REG_BUTTON_ACTIVITY';
export const CHANGE_BUTTON_LOAD = 'CHANGE_BUTTON_LOAD';
export const CHANGE_REDIRECT = 'CHANGE_REDIRECT';
export const CHANGE_ALL_VALID = 'CHANGE_ALL_VALID';

export const CHANGE_WARNING_TEXT = 'CHANGE_WARNING_TEXT';
export const CHANGE_ERR_MAIL_TEXT = 'CHANGE_ERR_MAIL_TEXT';

export const setName = (text) => ({
    type: CHANGE_NAME_TEXT,
    payload: text
})

export const setMail = (text) => ({
    type: CHANGE_MAIL_TEXT,
    payload: text
})

export const setPassword = (text) => ({
    type: CHANGE_PASSWORD_TEXT,
    payload: text
})

export const setBirthday = (text) => ({
    type: CHANGE_BIRTHDAY_TEXT,
    payload: text
})

export const setPhone = (text) => ({
    type: CHANGE_PHONE_TEXT,
    payload: text
})

export const setPassport = (text) => ({
    type: CHANGE_PASSPORT_TEXT,
    payload: text
})

export const setPassportDate = (text) => ({
    type: CHANGE_PASSPORT_DATE_TEXT,
    payload: text
})

export const setPassportOrgan = (text) => ({
    type: CHANGE_PASSPORT_ORGAN_TEXT,
    payload: text
})

export const setPassportCode = (text) => ({
    type: CHANGE_PASSPORT_CODE_TEXT,
    payload: text
})

export const setDriver = (text) => ({
    type:CHANGE_DRIVER_TEXT,
    payload: text
})

export const setDriverDate = (text) => ({
    type: CHANGE_DRIVER_DATE_TEXT,
    payload: text
})

export const setRegButtonActive = (text) => ({
    type: CHANGE_REG_BUTTON_ACTIVITY,
    payload: text
})

export const setRedirect = (boolean) => ({
    type: CHANGE_REDIRECT,
    payload: boolean
})

export const setButtonLoad = (boolean) => ({
    type: CHANGE_BUTTON_LOAD,
    payload: boolean
})

export const setAllValid = (boolean) => ({
    type: CHANGE_ALL_VALID,
    payload: boolean
})

export const setWarning = (boolean) => ({
    type: CHANGE_WARNING_TEXT,
    payload: boolean
})

export const setErrMail = (text) => ({
    type: CHANGE_ERR_MAIL_TEXT,
    payload: text
})