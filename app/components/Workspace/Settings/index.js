/* eslint-disable promise/catch-or-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';

const Config = JSON.parse(localStorage.getItem('db-config'));

const LOCAL_STORAGE_NAME = Config.storageName;
const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      rpc: '',
      tzstatsUrl: '',
      buttonName: 'Save',
      selectedNetworkType: '0',
      error: '',
    };
    this.saveRpcInfo = this.saveRpcInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNetworkTypeChange = this.handleNetworkTypeChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNetworkTypeChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  saveRpcInfo() {
    let error = '';
    const { label, rpc, selectedNetworkType, tzstatsUrl } = this.state;
    if (label === '') {
      error = 'Please enter label';
    } else if (
      Object.keys(Config.apiEndPoints).filter((e) => e === label).length > 0
    ) {
      error = 'Please enter a different label';
    } else if (rpc === '') {
      error = 'Please enter rpc';
    } else if (tzstatsUrl === '') {
      error = 'Please enter tzstats url';
    } else if (selectedNetworkType === '0') {
      error = 'Please enter network type';
    }
    if (error === '') {
      Config.Nodes.push(`${selectedNetworkType}-${label}`);
      Config.apiEndPoints[`${selectedNetworkType}-${label}`] = rpc;
      Config.TzStatsApiEndpoint[`${selectedNetworkType}-${label}`] = tzstatsUrl;
      Config.accounts[`${selectedNetworkType}`] = [];
      Config.contracts[`${selectedNetworkType}`] = [];
      Config.transactions[`${selectedNetworkType}`] = [];

      LocalStorage.Nodes.push(`${selectedNetworkType}-${label}`);
      LocalStorage.apiEndPoints[`${selectedNetworkType}-${label}`] = rpc;
      LocalStorage.TzStatsApiEndpoint[
        `${selectedNetworkType}-${label}`
      ] = tzstatsUrl;
      LocalStorage.userAccounts[`${selectedNetworkType}`] = [];
      LocalStorage.accounts[`${selectedNetworkType}`] = [];
      LocalStorage.contracts[`${selectedNetworkType}`] = [];
      LocalStorage.transactions[`${selectedNetworkType}`] = [];

      localStorage.setItem('db-config', JSON.stringify(LocalStorage));
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(LocalStorage));
    } else if (error !== '') {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error !== '') {
      swal('Error!', this.state.error, 'error').then(() => {
        return this.setState({ error: '' });
      });
    }
    const { buttonName } = this.state;
    const button = () => {
      switch (true) {
        case !this.props.buttonState && buttonName === 'Save':
          return (
            <button
              type="button"
              className="btn btn-success"
              disabled={this.props.buttonState}
              onClick={this.saveRpcInfo}
            >
              Save
            </button>
          );
        case this.props.buttonState:
          return (
            <button className="btn btn-success" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp;Please wait...
            </button>
          );
        default:
          return (
            <button
              type="button"
              className="btn btn-success"
              disabled={this.props.buttonState}
              onClick={this.saveRpcInfo}
            >
              Save
            </button>
          );
      }
    };
    return (
      <div className="accounts-container">
        <div className="wallet-container">
          <div className="wallet-input-container">
            <div className="modal-input">
              <header>
                <b>Setup custom rpc</b>
              </header>
            </div>
            <div className="modal-input">
              <div className="input-container">Label* </div>
              <input
                type="text"
                className="form-control"
                onChange={this.handleInputChange}
                name="label"
                value={this.state.label}
                placeholder="Enter label for your rpc network"
              />
            </div>
            <div className="modal-input">
              <div className="input-container">Network rpc* </div>
              <input
                type="text"
                className="form-control"
                onChange={this.handleInputChange}
                name="rpc"
                value={this.state.rpc}
                placeholder="Enter your rpc network endpoint"
              />
            </div>
            <div className="modal-input">
              <div className="input-container">Tzstats explorer endpoint* </div>
              <input
                type="text"
                className="form-control"
                onChange={this.handleInputChange}
                name="tzstatsUrl"
                value={this.state.tzstatsUrl}
                placeholder="Enter tzstats explorer endpoint"
              />
            </div>
            <div className="modal-input">
              <div className="input-container">Network type* </div>
              <select
                name="selectedNetworkType"
                className="custom-select"
                value={this.state.selectedNetworkType}
                onChange={this.handleNetworkTypeChange}
              >
                <option value="0" disabled>
                  {' '}
                  Select the network type{' '}
                </option>
                <option value="Localnode">Localnode</option>
                <option value="Testnet">Testnet</option>
                <option value="Mainnet">Mainnet</option>
              </select>
            </div>
            <div className="modal-footer">{button()}</div>
          </div>
          <div className="wallet-sidebar-container">
            <div className="alert alert-warning" role="alert">
              <p>
                Note: Tzstats explorer endpoint is required to explore
                blocks/accounts informations.
              </p>
            </div>
            <div className="alert alert-warning" role="alert">
              <p>
                Note: On creation of account you have to transfer some tezos to
                activate the account.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
