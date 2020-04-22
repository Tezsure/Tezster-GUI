/* eslint-disable no-script-url */
import React from 'react';
import { NavLink } from 'react-router-dom';

const { shell } = require('electron');

const issueLink = 'https://github.com/Tezsure/Tezster-GUI/issues';

function index() {
  return (
    <div className="help-section-container">
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>Please follow the link to create issue on github</h4>
          </div>
          <div className="cards-contents" />
        </div>
      </div>
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>
              <NavLink to="#" onClick={() => shell.openExternal(issueLink)}>
                {issueLink}
              </NavLink>
            </h4>
          </div>
          <div className="cards-contents" />
        </div>
      </div>
    </div>
  );
}

export default index;
