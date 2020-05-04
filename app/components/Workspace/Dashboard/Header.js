/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

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
      gas_limit,
      gas_price,
      chainId,
      rpcServer,
    } = this.props.dashboardHeader;
    const options = this.props.localConfig.Nodes.map((elem) => (
      <option key={elem} value={elem}>
        {elem}
      </option>
    ));
    return (
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
              <span className="active-status" />
            </h4>
          </div>
          <div className="cards-contents">
            <p>Status</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
