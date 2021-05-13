import { TEST_CHANGE_MAIL_TEXT } from "./actions";
import { TEST_CHANGE_PASS_TEXT } from "./actions";
import { TEST_CHANGE_REPEAT_PASS_TEXT } from "./actions";

const defaultState = {
    mail: '',
    pass: '',
    repeatPass: ''
}

export const resetPass = (state = defaultState, action) => {
    switch(action.type) {
        case TEST_CHANGE_MAIL_TEXT:
            return {
                ...state,
                mail: action.payload,
            };
        case TEST_CHANGE_PASS_TEXT:
            return {
                ...state,
                pass: action.payload,
            };
        case TEST_CHANGE_REPEAT_PASS_TEXT:
            return {
                ...state,
                repeatPass: action.payload,
            };
    default: return state;
        }
}