import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="siderbar-icon-container">
          <span
            className="hamburger-icon"
            onClick={() => props.sidebarToggleAction(props.sidebarToggleState)}
          />
        </div>
        <div className="search-bar-container">
          <div className="input-group">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search for block numbers and tx hashes"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
Header.protoTypes = {
  sidebarToggleAction: PropTypes.func,
  sidebarToggleState: PropTypes.bool
};

export default Header;
