/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Loader from './Loader';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  handleNetworkChange(event) {
    const payload = JSON.parse(JSON.stringify({ ...this.props }));
    payload.dashboardHeader.networkId = event.target.value;
    this.props.handleNetworkChangeAction(payload);
    this.props.getAccountsAction(payload);
    this.props.getBlockHeadsActions(payload);
  }

  render() {
    const {
      networkId,
      gas_limit,
      gas_price,
      chainId,
      rpcServer,
    } = this.props.dashboardHeader;
    const {
      tezsterStartNodes,
      tezsterError,
      isAvailableTezsterCli,
      localConfig,
      tezsterLoaderStatus,
      tezsterShowStopNodes,
    } = this.props;
    const loaderStatus =
      networkId === 'Localnode' &&
      isAvailableTezsterCli &&
      tezsterLoaderStatus.loader;
    let activeStatus = true;
    let message = [];
    const options = localConfig.Nodes.map((elem) => (
      <option key={elem} value={elem}>
        {elem}
      </option>
    ));
    let nodesButton = [];
    if (networkId === 'Localnode' && !tezsterShowStopNodes) {
      activeStatus = false;
      nodesButton = (
        <button
          type="button"
          className="save-button"
          onClick={() => this.props.installTezsterCliAction(this.props)}
        >
          Start nodes
        </button>
      );
    }
    if (networkId === 'Localnode' && tezsterShowStopNodes) {
      activeStatus = true;
      nodesButton = (
        <button
          type="button"
          className="save-button"
          onClick={() => this.props.stopTezsterNodesAction(this.props)}
        >
          Stop nodes
        </button>
      );
    }
    if (
      loaderStatus &&
      tezsterStartNodes.hasOwnProperty('totalProgressPercentage')
    ) {
      activeStatus = false;
      const totalImageProgress =
        !tezsterError && tezsterStartNodes.totalProgressPercentage
          ? tezsterStartNodes.totalProgressPercentage
          : 0;
      nodesButton = <Loader totalImageProgress={totalImageProgress} />;
    }
    if (networkId !== 'Localnode' && navigator.onLine) {
      activeStatus = true;
    }
    if (
      loaderStatus &&
      tezsterStartNodes.hasOwnProperty('msg') &&
      !tezsterError
    ) {
      if (tezsterStartNodes.msg === 'Downloading') {
        message = (
          <div className="cards-container success-msg">
            <p>
              Downloading tezster-cli version 1.0.2, size of the image is 937
              MB.
              <br />
              On slow connections, it may take upto 20-30 mins for docker pull.
            </p>
          </div>
        );
      } else {
        message = (
          <div className="cards-container success-message">
            <p>{tezsterStartNodes.msg}</p>
          </div>
        );
      }
    }
    if (loaderStatus && tezsterError !== '' && tezsterError) {
      message = (
        <div className="cards-container error-message">
          <p>{`Error: ${tezsterError}`}</p>
        </div>
      );
    }

    return (
      <>
        <div className="cards-container">
          <div className="cards" style={{ width: '350%' }}>
            <select
              className="custom-select"
              value={this.props.dashboardHeader.networkId}
              onChange={(e) => this.handleNetworkChange(e)}
            >
              {options}
            </select>
          </div>
          <div className="cards">
            <div className="cards-header">
              <h4>
                {gas_price} <span className="tezos-icon">ꜩ</span>
              </h4>
            </div>
            <div className="cards-contents">
              <p>Gas Price</p>
            </div>
          </div>
          <div className="cards">
            <div className="cards-header">
              <h4>{gas_limit}</h4>
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
          <div className="cards">
            <div className="cards-header">
              <h4 title="running">
                {activeStatus ? (
                  <span className="active-status" title="online" />
                ) : (
                  <span className="inactive-status" title="offline" />
                )}
              </h4>
            </div>
            <div className="cards-contents">
              <p>Status</p>
            </div>
          </div>
          {networkId === 'Localnode' && (
            <div className="cards" style={{ width: '150%' }}>
              <div className="cards-header">
                <div className="cards-header"> Nodes Action</div>
              </div>
              <div className="cards-contents">{nodesButton}</div>
            </div>
          )}
        </div>
        {message}
      </>
    );
  }
}

export default Header;
