/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { RpcRequest } from './checkAccountStatus';

const { shell } = require('electron');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faucet: `{"value":"Enter the faucet json"}`,
      label: '',
      error: '',
    };
    this.handleEditorCodeOnChange = this.handleEditorCodeOnChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddFaucetAccount = this.handleAddFaucetAccount.bind(this);
  }

  async handleAddFaucetAccount() {
    let error = '';
    if (this.state.faucet && this.state.faucet !== '') {
      const faucet = JSON.parse(this.state.faucet);
      const networkName = this.props.dashboardHeader.networkId.split('-')[0];
      const userAccount = JSON.parse(localStorage.getItem('tezsure'))
        .userAccounts[networkName];
      // eslint-disable-next-line no-lone-blocks
      {
        if (this.state.label === '') {
          error = 'Please enter label';
        } else if (
          userAccount.filter((elem) => elem.label === this.state.label).length >
          0
        ) {
          error = 'Label already in use, please choose a different label';
        } else if (
          !faucet.hasOwnProperty('mnemonic') ||
          faucet.mnemonic.length < 15
        ) {
          error = 'Please enter mnemonics';
        } else if (!faucet.hasOwnProperty('secret') || faucet.secret === '') {
          error = 'Please enter secret key';
        } else if (!faucet.hasOwnProperty('amount') || faucet.amount === '') {
          error = 'Please enter amount';
        } else if (!faucet.hasOwnProperty('pkh') || faucet.pkh === '') {
          error = 'Please enter public key hash';
        } else if (
          !faucet.hasOwnProperty('password') ||
          faucet.password === ''
        ) {
          error = 'Please enter password';
        } else if (!faucet.hasOwnProperty('email') || faucet.email === '') {
          error = 'Please enter email';
        }
      }
      if (error === '') {
        faucet.mnemonic = faucet.mnemonic.join(' ');
        faucet.label = this.state.label;
        const response = await RpcRequest.fetchBalance(faucet.pkh);
        if (response) {
          faucet.sk = faucet.secret;
          this.props.restoreFaucetAccountAction({
            ...faucet,
            ...this.props,
          });
          this.setState({ error });
        } else {
          this.props.createFaucetAccountsAction({ faucet, ...this.props });
          this.setState({
            error,
            label: '',
            faucet: `{"value":"Enter the faucet json"}`,
          });
        }
      } else {
        this.setState({
          error,
          label: '',
          faucet: `{"value":"Enter the faucet json"}`,
        });
      }
    } else {
      this.setState({ error: 'Please enter faucet' });
      return true;
    }
  }

  handleEditorCodeOnChange(event) {
    this.setState({ faucet: event.json });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const button = () => {
      switch (true) {
        case !this.props.buttonState:
          return (
            <button
              type="button"
              className="btn btn-success"
              disabled={this.props.buttonState}
              onClick={this.handleAddFaucetAccount}
            >
              Add Faucet Account
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
              onClick={this.handleAddFaucetAccount}
            >
              Add Faucet Account
            </button>
          );
      }
    };
    return (
      <div className="wallet-container">
        <div className="wallet-input-container">
          <div className="modal-input add-faucet-account">
            <div className="input-container">Label* </div>
            <input
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              name="label"
              value={this.state.label}
              placeholder="Enter label for your account"
            />
            {button()}
          </div>
          {this.state.labelErr && (
            <span className="error-msg">{this.state.labelErr}</span>
          )}
          <div style={{ maxWidth: '1400px', maxHeight: '100%' }}>
            <JSONInput
              id="a_unique_id"
              placeholder={{ value: 'Enter the faucet json' }}
              theme="dark_vscode_tribute"
              locale={locale}
              width="100%"
              height="50vh"
              onChange={this.handleEditorCodeOnChange}
              value={this.state.faucet}
            />
          </div>
        </div>
        <div className="wallet-sidebar-container">
          {this.state.error !== '' ? (
            <div className="alert alert-danger" role="alert">
              <p>Error: {this.state.error}</p>
            </div>
          ) : (
            ''
          )}
          <div className="alert alert-warning" role="alert">
            <p>
              Please enter the account parameters received from faucet{' '}
              <NavLink
                to="#"
                onClick={() =>
                  shell.openExternal('https://faucet.tzalpha.net/')
                }
              >
                https://faucet.tzalpha.net/
              </NavLink>
            </p>
          </div>
          <div className="alert alert-warning" role="alert">
            <p>Note: The account created will be a non fundraiser account.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
