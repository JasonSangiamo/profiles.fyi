import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  // store redux state in component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
  }
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;

    const guestButtons = (
      <div id="guestButtons">
        <Link className="btn btn-primary" to="/register" role="button">
          Sign Up
        </Link>
        <Link className="btn btn-primary" to="/login" role="button">
          Log In
        </Link>
        <Link className="btn btn-primary" to="/api" role="button">
          Our API
        </Link>
      </div>
    );

    const authButtons = (
      <div id="authButtons">
        <Link className="btn btn-primary" to="/dashboard" role="button">
          Dasboard
        </Link>
        <Link className="btn btn-primary" to="/profile" role="button">
          View Your Profile
        </Link>
        <Link className="btn btn-primary" to="/api" role="button">
          API Guide
        </Link>
      </div>
    );

    return (
      <div>
        <div className="landing">
          <div className="text-white text-center">
            <h1 className="landing-header">Welcome to profiles.fyi</h1>
            <h2 className="landing-subheader">
              The Easy Way for Great Companies to Connect with Great Talent
            </h2>
            {/* coniditonally display buttons */}
            {isAuthenticated ? authButtons : guestButtons}
          </div>
        </div>
        <div id="landing-bottom" className="text-black">
          <h2>How It Works</h2>
          <h3 className="landing-bottom-subheader">
            <span className="landing-accent">Create</span> an account and fill
            out your profile
          </h3>
          <h3 className="landing-bottom-subheader">
            <span className="landing-accent">Share</span> your profile with
            employers
          </h3>
          <h3 className="landing-bottom-subheader">
            <span className="landing-accent">Receive</span> offers from your
            dream companies
          </h3>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
