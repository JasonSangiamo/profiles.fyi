import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loginUser } from "../../actions/authActions";

class login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    // associate w/ object
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // triggered on input change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // triggered on form submissions
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  // store redux state in component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="d-flex justify-content-center">
        <form id="login-form" onSubmit={this.onSubmit}>
          <h1 className="text-center">Login</h1>
          <p className="text-center">
            Log into your profiles.fyi account. Don't have an account?{" "}
            <Link to="/register">Create one here </Link>
          </p>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.username
              })}
              id="username"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={classnames("form-control", {
                "is-invalid": errors.password
              })}
              id="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// maping component state to props
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(login);
