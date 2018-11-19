import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="text-white text-center">
          <h1 className="landing-header">Welcome to profiles.fyi</h1>
          <h2 className="landing-subheader">
            The Easy Way for Great Companies to Connect with Great Talent
          </h2>
          <a class="btn btn-primary" href="#" role="button">
            Sign Up
          </a>
          <a class="btn btn-primary" href="#" role="button">
            Log In
          </a>
          <a class="btn btn-primary" href="#" role="button">
            Our API
          </a>
        </div>
      </div>
    );
  }
}

export default Landing;
