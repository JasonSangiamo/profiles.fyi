import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="cocl-4 col-md-3 m-auto">
                <img
                  src={profile.user.avatar}
                  alt="Profile image"
                  className="rounded-circle"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">
                {profile.user.firstName} {profile.user.lastName}
              </h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </p>
              <p>{profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
