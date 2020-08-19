import { combineReducers } from "redux";

import authReducer from "./authReducer";
import generalReducer from "./generalReducer";
import reactivesearchReducer from "./reactivesearchReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  authReducer,
  themeReducer,
  generalReducer,
  reactivesearchReducer,
});

export default rootReducer;
