import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroups from "../common/TextFieldGroup";

class CreateProfile extends Component {
  // creating component state values for form
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      linkedin: "",
      errors: {}
    };
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Give us some information so we can make your portfolio stand out
              </p>
              <small className="d-block pb-3">
                * indicates required fields
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// need profile and error state
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(null)(CreateProfile);
