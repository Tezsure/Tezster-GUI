/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

function Error(props) {
  return (
    <div className="main-container">
      <div className="workplace-container">
        <div className="logo-container">
          <span className="logo-icon"> </span>
        </div>
        <div className="description-container">
          <div className="workplace-header">
            <b>
              {props.isAvailableTezsterCli === 'pending'
                ? 'Please wait...'
                : 'Sorry'}
            </b>
          </div>
          <p className="workplace-description">
            {props.isAvailableTezsterCli === 'pending'
              ? 'While we check whether tezster-cli is running'
              : 'Please install Tezster-CLI and restart the application'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
