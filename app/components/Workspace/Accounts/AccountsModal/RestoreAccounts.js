/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const conseiljs = require('conseiljs');

class RestoreAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      label: '',
      password: '',
      mnemonicSuggestion: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRestoreAccount = this.handleRestoreAccount.bind(this);
    this.handleCreateWallet = this.handleCreateWallet.bind(this);
  }

  componentDidMount() {
    this.setState({
      mnemonicSuggestion: conseiljs.TezosWalletUtil.generateMnemonic(),
    });
  }

  async handleCreateWallet() {
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
      const userAccount = JSON.parse(localStorage.getItem('tezsure'))
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
    if (stateParams.password === '') {
      stateParams.passwordErr = 'Please enter password';
      errFlag = true;
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
        msg:
          'Account created successfully \n Now transfer some tezos to activate the account',
      });
    } else {
      this.setState(stateParams);
    }
  }

  async handleRestoreAccount() {
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
      const userAccount = JSON.parse(localStorage.getItem('tezsure'))
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
    if (stateParams.password === '') {
      stateParams.passwordErr = 'Please enter password';
      errFlag = true;
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
    } else {
      this.setState(stateParams);
    }
  }

  handleInputChange(event) {
    if (event.target.name === 'mnemonic') {
      const mnemonic = event.target.value;
      this.setState({ mnemonic });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create/Restore Wallet</h5>
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
            Node provider is connected : {this.props.dashboardHeader.rpcServer}{' '}
            <br />
            Note: The account created will be a non fundraiser account.
          </p>
        </div>
        <div className="modal-body">
          Use the below mnemonic to create wallet
          <p className="suggestion-msg">{this.state.mnemonicSuggestion}</p>
        </div>
        <div className="modal-input">
          <div className="input-container">Label </div>
          <input
            type="text"
            className="form-control"
            onChange={this.handleInputChange}
            name="label"
            value={this.state.label}
            placeholder="Enter label for your account"
          />
        </div>
        <span className="error-msg">{this.state.labelErr}</span>
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
        <span className="error-msg">{this.state.passwordErr}</span>
        <div className="modal-body">
          <p>Seed Words/Mnenomics</p>
          <textarea
            name="mnemonic"
            rows="4"
            cols="40"
            placeholder="Enter seed words/mnemonic"
            value={this.state.mnemonic}
            onChange={this.handleInputChange}
            className="textArea form-control"
          />
          <br />
          <span className="error-msg">{this.state.mnemonicErr}</span>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-success"
            disabled={this.props.buttonState}
            onClick={() => this.handleCreateWallet()}
          >
            {this.props.buttonState ? 'Please wait....' : 'Create Wallet'}
          </button>
          <button
            type="button"
            className="btn btn-success"
            disabled={this.props.buttonState}
            onClick={() => this.handleRestoreAccount()}
          >
            {this.props.buttonState ? 'Please wait....' : 'Restore Wallet'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default RestoreAccounts;
