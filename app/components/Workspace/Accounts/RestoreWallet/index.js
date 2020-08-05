/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

const conseiljs = require('conseiljs');

const { storageName } = require('../../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = storageName;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      mnemonicErr: '',
      label: '',
      labelErr: '',
      password: '',
      mnemonicSuggestion: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRestoreWallet = this.handleRestoreWallet.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value.trim() });
  }

  async handleRestoreWallet() {
    let errFlag = false;
    const stateParams = {
      ...this.state,
      mnemonicErr: '',
      labelErr: '',
      passwordErr: '',
    };
    if (stateParams.mnemonic === '') {
      stateParams.mnemonicErr = 'Please enter mnemonic';
      errFlag = true;
    }
    if (stateParams.label === '') {
      stateParams.labelErr = 'Please enter label for your account';
      errFlag = true;
    }
    if (stateParams.label !== '') {
      const networkId = this.props.dashboardHeader.networkId.split('-')[0];
      const userAccount = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
        .userAccounts[networkId];
      if (
        userAccount.filter((elem) => elem.label === stateParams.label).length >
        0
      ) {
        stateParams.labelErr =
          'Label already in use, please choose a different label';
        errFlag = true;
      }
    }
    if (errFlag === false) {
      const keystore = await conseiljs.TezosWalletUtil.unlockIdentityWithMnemonic(
        this.state.mnemonic,
        this.state.password
      );
      const userParams = {
        ...keystore,
        sk: keystore.secret,
        pk: keystore.publicKey,
        secret: keystore.secret,
        label: stateParams.label,
        pkh: keystore.publicKeyHash,
        password: stateParams.password,
        mnemonic: stateParams.mnemonic,
      };
      this.props.restoreFaucetAccountAction({
        ...userParams,
        ...this.props,
      });
      this.setState({
        mnemonic: '',
        mnemonicErr: '',
        label: '',
        labelErr: '',
        password: '',
        mnemonicSuggestion: '',
      });
    } else {
      this.setState(stateParams);
    }
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
              onClick={this.handleRestoreWallet}
            >
              Restore Wallet
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
              onClick={this.handleRestoreWallet}
            >
              Restore Wallet
            </button>
          );
      }
    };
    return (
      <div className="wallet-container">
        <div className="wallet-input-container">
          <div className="modal-input">
            <div className="input-container">Label* </div>
            <input
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              name="label"
              value={this.state.label}
              placeholder="Enter label for your account"
            />
          </div>
          {this.state.labelErr && (
            <span className="error-msg" style={{ marginLeft: '30%' }}>
              {this.state.labelErr}
            </span>
          )}
          <div className="modal-input">
            <div className="input-container">Password </div>
            <input
              type="password"
              onChange={this.handleInputChange}
              name="password"
              value={this.state.password}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          {this.state.passwordErr && (
            <span className="error-msg">{this.state.passwordErr}</span>
          )}
          <div className="modal-body">
            <p>Seed Words/Mnenomics*</p>
            <textarea
              style={{ paddingBottom: '0rem' }}
              name="mnemonic"
              rows="3"
              cols="40"
              placeholder="Enter seed words/mnemonic"
              value={this.state.mnemonic}
              onChange={this.handleInputChange}
              className="textArea form-control"
            />
            {this.state.mnemonicErr && (
              <span className="error-msg">{this.state.mnemonicErr}</span>
            )}
          </div>
          <div className="modal-footer">{button()}</div>
        </div>
        <div className="wallet-sidebar-container">
          <div className="alert alert-warning" role="alert">
            <p>
              Note: Do not import production keys / wallets / fundraiser
              wallets.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
