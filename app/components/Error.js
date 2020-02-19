import React from 'react';

function Error() {
  return (
    <div className="main-container">
      <div className="workplace-container">
        <div className="logo-container">
          <span className="logo-icon"> </span>
        </div>
        <div className="description-container">
          <div className="workplace-header">
            <b>Sorry</b>
          </div>
          <p className="workplace-description">
            Please install Tezster-CLI and restart the application
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
