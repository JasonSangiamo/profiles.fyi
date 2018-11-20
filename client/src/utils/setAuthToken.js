// used to set token as Authorization header
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // if token is defined, set it for every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // if token isn't there, delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
