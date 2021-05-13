export const TEST_CHANGE_MAIL_TEXT = 'TEST_CHANGE_MAIL_TEXT';
export const TEST_CHANGE_PASS_TEXT = 'TEST_CHANGE_PASS_TEXT';

export const setMail = (mail) => ({
    type: TEST_CHANGE_MAIL_TEXT,
    payload: mail
})

export const setPass = (pass) => ({
    type: TEST_CHANGE_PASS_TEXT,
    payload: pass
})