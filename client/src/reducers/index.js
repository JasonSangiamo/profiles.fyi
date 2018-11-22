// root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  // accessed by key. Ex: this.props.auth for auth reducer
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer
});
