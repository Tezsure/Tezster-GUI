import React from 'react';
import { Link } from 'react-router-dom';

function Onboard() {
  return (
    <div className="main-container">
      <div className="workplace-container">
        <div className="logo-container">
          <span className="logo-icon"> </span>
        </div>
        <div className="description-container">
          <div className="workplace-header">
            <b>create</b> a workspace
          </div>
          <p className="workplace-description">
            Quick start for a one-click blockchain or create a new
            <br /> workspace for advanced setup options.
          </p>
        </div>
        <div className="workplace-button-container">
          <Link
            to="/workspace"
            className="btn btn-success btn-lg
                          quick-start-button"
          >
            Quick Start
          </Link>
          <Link
            to="/workspace"
            className="btn btn-success btn-lg
                          new-workspace-button"
          >
            New Workspace
          </Link>
        </div>
        <div className="workplace-update-container">
          <div className="footer-text">
            learn more about products &amp; upcomming updates
          </div>
          <a href="ll" className="update-link">
            check for updates
          </a>
        </div>
      </div>
      <div className="workplace-footer">
        <div className="privacy-text">Terms of Privacy</div>
        <div className="language-text">LN · EN</div>
      </div>
    </div>
  );
}

export default Onboard;
