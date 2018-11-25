import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="mb-4" role="group">
          {/* Edit profile link */}
          <Link className="btn btn-light" to="/edit-profile">
            <i className="fas fa-user-circle text-info mr-1" />
            Edit Profile
          </Link>
          {/* Add expereicne link link */}
          <Link className="btn btn-light" to="/add-experience">
            <i className="fab fa-black-tie text-info mr-1" />
            Add experience
          </Link>
          {/* Add education link */}
          <Link className="btn btn-light" to="/add-education">
            <i className="fas fa-graduation-cap text-info mr-1" />
            Add Education
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
