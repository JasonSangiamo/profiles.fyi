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
      </div>
    );

    const authButtons = (
      <div id="authButtons">
        <Link className="btn btn-primary" to="/dashboard" role="button">
          Dasboard
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
