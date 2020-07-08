/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { RpcRequest } from './checkAccountStatus';

const { shell } = require('electron');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faucet: '',
      label: '',
      error: '',
    };
    this.handleFaucetInput = this.handleFaucetInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddFaucetAccount = this.handleAddFaucetAccount.bind(this);
    this.handleIsValidJson = this.handleIsValidJson.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleIsValidJson(str) {
    try {
      return JSON.parse(str) && !!str;
    } catch (e) {
      return false;
    }
  }

  async handleAddFaucetAccount() {
    let error = '';
    if (
      this.state.faucet &&
      this.state.faucet !== '' &&
      this.handleIsValidJson(this.state.faucet)
    ) {
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
        } else if (networkName === 'Localnode') {
          error =
            'We currently donot support activating faucet account on localnode, please change network type to continue.';
        }
      }
      if (error === '') {
        faucet.mnemonic = faucet.mnemonic.join(' ');
        faucet.label = this.state.label;
        const response =
          networkName !== 'Localnode'
            ? await RpcRequest.fetchBalanceCarthagnet(faucet.pkh)
            : await RpcRequest.fetchBalanceLocalnode(faucet.pkh);
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
            faucet: '',
          });
        }
      } else {
        this.setState({
          error,
        });
      }
    } else {
      this.setState({ error: 'Please enter your faucet in json format.' });
      return true;
    }
  }

  handleFaucetInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { faucet } = this.state;
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
            <textarea
              name="faucet"
              className="faucet-textarea"
              style={{
                width: '98%',
                maxHeight: '50vh',
                height: '50vh',
                border: '1px solid #ced4da',
                backgroundColor: '#f8f9fa',
                boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
              }}
              placeholder="Please enter your faucet in json format."
              onChange={this.handleInputChange}
              value={
                typeof faucet === 'object'
                  ? JSON.stringify(faucet, undefined, 2)
                  : faucet
              }
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
