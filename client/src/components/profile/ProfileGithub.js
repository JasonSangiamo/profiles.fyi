import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "2ec046a1af2979a37da8",
      clientSecret: "41220f930850db52b5d56690db989dd6cc9b2c38",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.profilesfyi) {
          this.setState({ repos: data });
          console.log(data);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoDiv = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-primary mr-1">
              Language: {repo.language}
            </span>
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="profilesfyi">
        <hr />
        <h3 className="mb-4">Latest Github Activity</h3>
        {repoDiv}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
