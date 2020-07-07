/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import SidebarIcon from '../../../Onboard/SidebarIcon';

const conseiljs = require('conseiljs');

const { storageName } = require('../../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = storageName;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      labelErr: '',
      password: '',
      mnemonicSuggestion: '',
      buttonName: 'Create Wallet',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateWallet = this.handleCreateWallet.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleCreateWallet() {
    let errFlag = false;
    const stateParams = {
      ...this.state,
      labelErr: '',
      passwordErr: '',
    };
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
    if (this.state.buttonName === 'Create Wallet' && errFlag === false) {
      this.setState({
        labelErr: '',
        buttonName: 'Proceed',
        mnemonicSuggestion: conseiljs.TezosWalletUtil.generateMnemonic(),
      });
    } else if (this.state.buttonName === 'Proceed' && errFlag === false) {
      const keystore = await conseiljs.TezosWalletUtil.unlockIdentityWithMnemonic(
        this.state.mnemonicSuggestion,
        this.state.password || ''
      );
      const userParams = {
        ...keystore,
        sk: keystore.secret,
        pk: keystore.publicKey,
        secret: keystore.secret,
        label: stateParams.label,
        pkh: keystore.publicKeyHash,
        password: stateParams.password,
        mnemonic: stateParams.mnemonicSuggestion,
      };
      this.props.restoreFaucetAccountAction({
        ...userParams,
        ...this.props,
        msg:
          'Account created successfully \n Now transfer some tezos to activate the account',
      });
      this.setState({
        label: '',
        labelErr: '',
        buttonName: 'Create Wallet',
        mnemonicSuggestion: '',
      });
    } else {
      this.setState(stateParams);
    }
  }

  render() {
    const { buttonName } = this.state;
    const button = () => {
      switch (true) {
        case !this.props.buttonState && buttonName === 'Create Wallet':
          return (
            <button
              type="button"
              className="btn btn-success"
              disabled={this.props.buttonState}
              onClick={this.handleCreateWallet}
            >
              Create Wallet
            </button>
          );
        case !this.props.buttonState && buttonName === 'Proceed':
          return (
            <button
              type="button"
              className="btn btn-success"
              disabled={this.props.buttonState}
              onClick={this.handleCreateWallet}
            >
              Proceed <SidebarIcon />
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
              onClick={this.handleCreateWallet}
            >
              Create Wallet
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
          {this.state.mnemonicSuggestion !== '' ? (
            <>
              <div className="modal-input" style={{ paddingBottom: '0px' }}>
                Please copy the generated mnemonic below and then click on
                proceed.
                <br />
              </div>
              <div className="modal-input" style={{ paddingBottom: '0px' }}>
                <div className="alert alert-warning" role="alert">
                  {this.state.mnemonicSuggestion}
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          <div className="modal-footer">{button()}</div>
        </div>
        <div className="wallet-sidebar-container">
          <div className="alert alert-warning" role="alert">
            <p>Note: The account created will be a non fundraiser account.</p>
          </div>
          <div className="alert alert-warning" role="alert">
            <p>
              Note: On creation of account you have to transfer some tezos to
              activate the account.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
