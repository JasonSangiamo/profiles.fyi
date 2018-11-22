import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  // always get current profile on this page
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(Dashboard);
