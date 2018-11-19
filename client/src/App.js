import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// custom css
import "./App.css";

// components
import Navbar from "./components/laylout/Navbar";
import Footer from "./components/laylout/Footer";
import Landing from "./components/laylout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
