/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-script-url */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const { shell } = require('electron');

class ActivateAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faucet: {
        email: '',
        password: '',
        pkh: '',
        secret: '',
        mnemonic: [],
      },
      error: {
        errorEmail: '',
        errorPassword: '',
        errorPkh: '',
        errorSecret: '',
        errorMnemonic: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const faucet = { ...this.state.faucet };
    const error = {
      errorEmail: '',
      errorPassword: '',
      errorPkh: '',
      errorSecret: '',
      errorMnemonic: '',
    };
    if (event.target.name === 'mnemonic') {
      faucet[event.target.name] = event.target.value
        .split('"')
        .join('')
        .replace(/\n/g, '')
        .replace(/\s/g, '')
        .split(',')
        .join(' ');
      this.setState({ faucet, error });
    } else {
      faucet[event.target.name] = event.target.value;
      this.setState({ faucet, error });
    }
  }

  handleCreateWallet = () => {
    let errorFlag = false;
    const error = {
      errorEmail: '',
      errorPassword: '',
      errorPkh: '',
      errorSecret: '',
      errorMnemonic: '',
    };
    if (this.state.faucet.email === '') {
      error.errorEmail = 'Please enter email';
      errorFlag = true;
    }
    if (this.state.faucet.password === '') {
      error.errorPassword = 'Please enter password';
      errorFlag = true;
    }
    if (this.state.faucet.pkh === '') {
      error.errorPkh = 'Please enter public key hash';
      errorFlag = true;
    }
    if (this.state.faucet.secret === '') {
      error.errorSecret = 'Please enter secret key';
      errorFlag = true;
    }
    if (
      this.state.faucet.mnemonic === [] ||
      this.state.faucet.mnemonic.length < 2
    ) {
      error.errorMnemonic = 'Please enter mnemonics';
      errorFlag = true;
    }
    if (errorFlag) {
      this.setState({ error });
    } else {
      this.props.handleActivateAccount({ ...this.state, ...this.props });
    }
  };

  handleRestoreWallet = () => {
    let errorFlag = false;
    const error = {
      errorEmail: '',
      errorPassword: '',
      errorPkh: '',
      errorSecret: '',
      errorMnemonic: '',
    };
    if (this.state.faucet.email === '') {
      error.errorEmail = 'Please enter email';
      errorFlag = true;
    }
    if (this.state.faucet.password === '') {
      error.errorPassword = 'Please enter password';
      errorFlag = true;
    }
    if (this.state.faucet.pkh === '') {
      error.errorPkh = 'Please enter public key hash';
      errorFlag = true;
    }
    if (this.state.faucet.secret === '') {
      error.errorSecret = 'Please enter secret key';
      errorFlag = true;
    }
    if (
      this.state.faucet.mnemonic === [] ||
      this.state.faucet.mnemonic.length < 2
    ) {
      error.errorMnemonic = 'Please enter mnemonics';
      errorFlag = true;
    }
    if (errorFlag) {
      this.setState({ error });
    } else {
      this.props.restoreFaucetAccountAction({ ...this.state, ...this.props });
    }
  };

  render() {
    const {
      errorEmail,
      errorPassword,
      errorPkh,
      errorSecret,
      errorMnemonic,
    } = this.state.error;
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Faucet Account</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Please enter faucet from{' '}
            <NavLink
              to="#"
              onClick={() => shell.openExternal('https://faucet.tzalpha.net/')}
            >
              https://faucet.tzalpha.net/
            </NavLink>
            <span className="important-symbol">*</span>
          </p>
          <p>
            Please click on restore wallet button to add an already activated
            account
          </p>
          <p>Please click on activate wallet button to activate an account</p>
        </div>
        <div className="modal-input">
          <div className="input-container">Email</div>
          <input
            type="text"
            name="email"
            value={this.state.faucet.email}
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <span className="error-msg">{errorEmail}</span>
        <div className="modal-input">
          <div className="input-container">Password</div>
          <input
            type="text"
            name="password"
            className="form-control"
            value={this.state.faucet.password}
            onChange={this.handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        <span className="error-msg">{errorPassword}</span>
        <div className="modal-input">
          <div className="input-container">Public key hash</div>
          <input
            type="text"
            className="form-control"
            name="pkh"
            value={this.state.faucet.pkh}
            onChange={this.handleInputChange}
            placeholder="Enter your public key hash"
          />
        </div>
        <span className="error-msg">{errorPkh}</span>
        <div className="modal-input">
          <div className="input-container">Secret</div>
          <input
            type="text"
            name="secret"
            value={this.state.faucet.secret}
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="Enter your secret key"
          />
        </div>
        <span className="error-msg">{errorSecret}</span>
        <div className="modal-body">
          <textarea
            className="form-control"
            name="mnemonic"
            style={{ height: '300px' }}
            value={this.state.faucet.mnemonic}
            placeholder="Please enter mnemonic"
            onChange={this.handleInputChange}
          />
        </div>
        <span className="error-msg">{errorMnemonic}</span>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.handleCreateWallet.bind(this)}
            disabled={this.props.buttonState}
          >
            {this.props.buttonState ? 'Please wait....' : 'Activate Wallet'}
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.handleRestoreWallet.bind(this)}
            disabled={this.props.buttonState}
          >
            {this.props.buttonState ? 'Please wait....' : 'Restore Wallet'}
          </button>
        </div>
      </div>
    );
  }
}

export default ActivateAccounts;
