import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/laylout/Navbar";
import Footer from "./components/laylout/Footer";
import Landing from "./components/laylout/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
