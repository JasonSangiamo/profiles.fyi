import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    // once profile has been gotten, return state and set loading to false
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    // clearing profile on logout
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    // getting all profiles
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
