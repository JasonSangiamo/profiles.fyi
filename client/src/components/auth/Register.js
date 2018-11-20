import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.email
              })}
              id="email"
              name="email"
              placeholder="Enter A Valid Email Address"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.firstName
              })}
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              value={this.state.firstName}
              onChange={this.onChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.lastName
              })}
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              value={this.state.lastName}
              onChange={this.onChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
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

          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              className={classnames("form-control", {
                "is-invalid": errors.password2
              })}
              id="password2"
              name="password2"
              placeholder="Confirm Your Password"
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>
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
