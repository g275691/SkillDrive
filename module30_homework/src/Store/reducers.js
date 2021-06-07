import { combineReducers } from "redux";

import { registration } from "./Registration/reducers";
import { login } from "./login/reducers";
import { global } from "./global/reducers";
import { RentPage } from "./RentPage/reducers";
import { MyCars } from "./MyCars/reducers";
import { NewCar } from "./NewCar/reducers";

export default combineReducers({
  registration,
  login,
  RentPage,
  global,
  MyCars,
  NewCar
})