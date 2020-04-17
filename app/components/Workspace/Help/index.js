/* eslint-disable no-script-url */
import React from 'react';

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
              <a
                href="javascript:void(0);"
                onClick={() => shell.openExternal(issueLink)}
              >
                {issueLink}
              </a>
            </h4>
          </div>
          <div className="cards-contents" />
        </div>
      </div>
    </div>
  );
}

export default index;
