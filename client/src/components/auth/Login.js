import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";

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

  // redirect user if user is authenticated
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
          <TextFieldGroup
            placeholder="Enter username"
            name="username"
            type="text"
            label="Username"
            value={this.state.username}
            onChange={this.onChange}
            error={errors.username}
          />
          <TextFieldGroup
            placeholder="Enter password"
            name="password"
            type="password"
            label="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

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
