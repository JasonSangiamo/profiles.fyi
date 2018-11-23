import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  // always get current profile on this page
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const profile = this.props.profile.profile;
    const loading = this.props.profile.loading;

    let dashboardContent;

    // check if current profile is null, user is logged out or profile is loading
    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    }

    // if profile isn't loading and user has no profile, let user create profile
    // if user does already have a profile, display dashboard to user
    else {
      // if > 0, something is in the object so profile is loaded
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>Display profile here</h4>;
      } else {
        // user is logged in but doesn't have a profile
        dashboardContent = (
          <div>
            <p className="load text-muted">Welcome, {user.firstName}</p>
            <p>
              You haven't set up your profile yet. You can do so
              <Link to="/create-profile"> here</Link>
            </p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
