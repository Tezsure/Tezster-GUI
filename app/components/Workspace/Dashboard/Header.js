import React from 'react';

function Header() {
  return (
    <div className="dashboard-header">
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>00</h4>
          </div>
          <div className="cards-contents">
            <p>Current Block</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>$6000000</h4>
          </div>
          <div className="cards-contents">
            <p>Gas Price</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>
              <i
                className="fas fa-long-arrow-alt-up"
                style={{ color: '#30d530' }}
              />{' '}
              Petersburg
            </h4>
          </div>
          <div className="cards-contents">
            <p>Hard Fork</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>17156</h4>
          </div>
          <div className="cards-contents">
            <p>Network Id</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>https://127.0.0.1:7545</h4>
          </div>
          <div className="cards-contents">
            <p>Rpc Server</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>automining</h4>
          </div>
          <div className="cards-contents">
            <p>Mining status</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>Quick Access</h4>
          </div>
          <div className="cards-contents">
            <p>Workspace</p>
          </div>
        </div>
        <div className="cards button-card">
          <button type="button" className="save-button">
            save
          </button>
          <button type="button" className="switch-button">
            switch
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
