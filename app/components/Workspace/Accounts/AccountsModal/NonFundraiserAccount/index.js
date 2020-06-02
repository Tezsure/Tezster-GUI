import React, { Component } from 'react';
import CreateAccount from './CreateAccount';
import RestoreAccount from './RestoreAccount';
const conseiljs = require('conseiljs');
const { storageName } = require('../../../../../apis/config');
const LOCAL_STORAGE_NAME = storageName;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      label: '',
      password: '',
      mnemonicSuggestion: '',
      CurrentTab: 'createAccount',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRestoreWallet = this.handleRestoreWallet.bind(this);
    this.handleCreateWallet = this.handleCreateWallet.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
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
    if (errFlag === false) {
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
    } else {
      this.setState(stateParams);
    }
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
      const mnemonic = event.target.value
        .split('"')
        .join('')
        .replace(/\n/g, '')
        .replace(/\s/g, '')
        .split(',')
        .join(' ');
      this.setState({ mnemonic });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleTabChange(CurrentTab) {
    this.setState({ CurrentTab });
  }

  render() {
    const { CurrentTab } = this.state;
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
        <div className="contracts-table-container">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <span
                className={
                  CurrentTab === 'createAccount'
                    ? 'nav-link active'
                    : 'nav-link'
                }
                id="home-tab"
                data-toggle="tab"
                role="tab"
                onClick={() => this.handleTabChange('createAccount')}
              >
                Create account
              </span>
            </li>
            <li className="nav-item">
              <span
                className={
                  CurrentTab === 'restoreAccount'
                    ? 'nav-link active'
                    : 'nav-link'
                }
                id="home-tab"
                data-toggle="tab"
                role="tab"
                onClick={() => this.handleTabChange('restoreAccount')}
              >
                Restore account
              </span>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className={
                CurrentTab === 'createAccount'
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              }
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <CreateAccount
                {...this.props}
                stateParams={this.state}
                handleCreateWallet={this.handleCreateWallet}
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div
              className={
                CurrentTab === 'restoreAccount'
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              }
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <RestoreAccount
                {...this.props}
                stateParams={this.state}
                handleRestoreWallet={this.handleRestoreWallet}
                handleInputChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
