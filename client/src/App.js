import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// Provider is a component that provides application with store (which holds state)
import { Provider } from "react-redux";
import store from "./store";

// custom css
import "./App.css";

// components
import Navbar from "./components/laylout/Navbar";
import Footer from "./components/laylout/Footer";
import Landing from "./components/laylout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

//check for token
if (localStorage.jwtToken) {
  // set header for all requests
  setAuthToken(localStorage.jwtToken);

  // decode token and set user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // set the current user
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout user if token is timed out
    store.dispatch(logoutUser());

    // TODO: clear current profile as well

    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* keep landing out of div to avoid margins/padding for parralax image */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
