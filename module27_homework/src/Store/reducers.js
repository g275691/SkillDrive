import { combineReducers } from "redux";
import { registration } from "./Registration/reducers";

import { login } from "./login/reducers";

export default combineReducers({
  registration,
  login
})