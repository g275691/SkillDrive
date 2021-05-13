import { TEST_CHANGE_MAIL_TEXT } from "./actions";
import { TEST_CHANGE_PASS_TEXT } from "./actions";

const defaultState = {
    mail: '',
    pass: ''
}

export const testReducer = (state = defaultState, action) => {
    switch(action.type) {
        case TEST_CHANGE_MAIL_TEXT:
            return {
                ...state,
                mail: action.payload,
            };

    default: return state;
        }
}