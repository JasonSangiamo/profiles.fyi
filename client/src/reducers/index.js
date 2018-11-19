// root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // accessed by key. Ex: this.props.auth for auth reducer
  auth: authReducer
});
