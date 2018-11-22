import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
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
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      password2: this.state.password2
    };

    // passing this.props.history allows for redirect within action
    this.props.registerUser(newUser, this.props.history);
  }

  // redirect user if user is authenticated
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // get errors from redux state and store in component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const errors = this.state.errors;
    // const user = this.props.auth.user;
    return (
      <div className="d-flex justify-content-center">
        <form id="register-form" onSubmit={this.onSubmit}>
          <h1 className="text-center">Register</h1>
          <p className="text-center">Create an Account with profiles.fyi</p>

          {/* username input */}
          <TextFieldGroup
            placeholder="Enter username"
            name="username"
            type="text"
            label="Username"
            value={this.state.username}
            onChange={this.onChange}
            error={errors.username}
          />

          {/* email input */}
          <TextFieldGroup
            placeholder="Enter valid email address"
            name="email"
            type="text"
            label="Email Address"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          {/* firstName input */}
          <TextFieldGroup
            placeholder="Enter first name"
            name="firstName"
            type="text"
            label="First Name"
            value={this.state.firstName}
            onChange={this.onChange}
            error={errors.firstName}
          />

          {/* lastName input */}
          <TextFieldGroup
            placeholder="Enter last name"
            name="lastName"
            type="text"
            label="Last Name"
            value={this.state.lastName}
            onChange={this.onChange}
            error={errors.lastName}
          />

          {/* password input */}
          <TextFieldGroup
            placeholder="Enter passord"
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

          {/* confirm password input */}
          <TextFieldGroup
            placeholder="Confirm password"
            name="password2"
            type="password2"
            label="Confirm Password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// allows access via this.props.auth
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
