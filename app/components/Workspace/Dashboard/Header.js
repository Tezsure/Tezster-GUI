/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import swal from 'sweetalert';
import Loader from './Loader';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleNetworkChange = this.handleNetworkChange.bind(this);
    this.handleStopNodes = this.handleStopNodes.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleStopNodes(args) {
    const stopNodesMessage =
      'Stopping localnodes will remove existing activated accounts and deployed contracts on localnode';
    const title = 'Are you sure?';
    // eslint-disable-next-line promise/catch-or-return
    swal({
      title: 'Are you sure?',
      text: stopNodesMessage,
      icon: 'warning',
      buttons: ['Cancel', 'Proceed'],
      dangerMode: true,
    }).then((isConfirm) => {
      // eslint-disable-next-line promise/always-return
      if (isConfirm) {
        this.props.stopTezsterNodesAction(args);
      } else {
        swal('Cancelled', 'Localnodes are still running', 'error');
      }
    });
  }

  handleNetworkChange(event) {
    const payload = JSON.parse(JSON.stringify({ ...this.props }));
    payload.dashboardHeader.networkId = event.target.value;
    this.props.handleNetworkChangeAction(payload);
    this.props.getBlockHeadsAction(payload);
    this.props.getAccountsAction(payload);
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
      localConfig,
      tezsterLoaderStatus,
      tezsterShowStopNodes,
    } = this.props;
    const loaderStatus =
      networkId === 'Localnode' && tezsterLoaderStatus.loader;
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
          onClick={() => this.props.installLocalnodesAction(this.props)}
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
          onClick={() => this.handleStopNodes(this.props)}
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
          <div className="cards-container success-message">
            <p>
              Setting up localnodes please wait...
              <br />
              On slow connections, it may take upto 20-30 mins for first time.
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
      if (tezsterError === 'docker-permission') {
        message = (
          <div className="cards-container error-message">
            <p>
              {`Error: Docker doesnot have sufficient permission to run without root user access. `}
              <br />
              Please follow the link
              https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user
            </p>
          </div>
        );
      } else {
        message = (
          <div className="cards-container error-message">
            <p>{`Error: ${tezsterError}`}</p>
          </div>
        );
      }
    }

    return (
      <>
        <div className="cards-container">
          <div className="cards" style={{ width: '350%' }}>
            <select
              className="custom-select"
              value={this.props.dashboardHeader.networkId}
              onChange={(e) => this.handleNetworkChange(e)}
              disabled={loaderStatus && networkId === 'Localnode'}
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
