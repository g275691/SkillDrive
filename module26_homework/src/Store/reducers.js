import { combineReducers } from "redux";
import { registration } from "./Registration/reducers";
import { resetPass } from "./ResetPassword/reducers";
import { testReducer } from "./Test/reducers";
import { login } from "./login/reducers";

export default combineReducers({
  testReducer: testReducer,
  resetPass: resetPass,
  registration: registration,
  login: login
})