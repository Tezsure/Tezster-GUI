import React from 'react';

function Header(props) {
  const {
    currentBlock,
    gasPrice,
    gasLimit,
    chainId,
    rpcServer
  } = props.dashboardHeader;
  return (
    <div className="dashboard-header">
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4 title="running">
              <span className="active-status" />
            </h4>
          </div>
          <div className="cards-contents">
            <p>Status</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>${gasPrice}</h4>
          </div>
          <div className="cards-contents">
            <p>Gas Price</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>${gasLimit}</h4>
          </div>
          <div className="cards-contents">
            <p>Gas Limit</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>{chainId}</h4>
          </div>
          <div className="cards-contents">
            <p>Chain Id</p>
          </div>
        </div>
        <div className="cards">
          <div className="cards-header">
            <h4>{rpcServer}</h4>
          </div>
          <div className="cards-contents">
            <p>Rpc Server</p>
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
