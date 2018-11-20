import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="text-white text-center">
          <h1 className="landing-header">Welcome to profiles.fyi</h1>
          <h2 className="landing-subheader">
            The Easy Way for Great Companies to Connect with Great Talent
          </h2>
          <Link className="btn btn-primary" to="/register" role="button">
            Sign Up
          </Link>
          <Link className="btn btn-primary" to="/login" role="button">
            Log In
          </Link>
          <Link className="btn btn-primary" to="#" role="button">
            Our API
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
