// root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  // accessed by key. Ex: this.props.auth for auth reducer
  auth: authReducer,
  errors: errorReducer
});
