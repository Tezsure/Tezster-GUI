/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';
const conseiljs = require('conseiljs');
import JSONPretty from 'react-json-pretty';

const fs = require('fs');

class DeployContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      contractFile: '',
      contractLabel: '',
      storageValue: '',
      storageFormat: '',
      contractAmount: '',
      error: '',
      enteredContract: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeployContract = this.handleDeployContract.bind(this);
    this.handleGetInitialStorage = this.handleGetInitialStorage.bind(this);
  }
  async handleGetInitialStorage(contract) {
    const storageFormat = await conseiljs.TezosLanguageUtil.preProcessMichelsonScript(
      contract
    );
    return storageFormat[1].slice(8);
  }

  handleDeployContract() {
    let error = '';
    if (this.state.accounts === '0') {
      error = 'Please select an account';
    } else if (
      this.state.contractFile === '' &&
      this.state.enteredContract === ''
    ) {
      error = 'Please upload a contract or paste a contract code';
    } else if (this.state.contractLabel === '') {
      error = 'Please enter contract label';
    } else if (this.state.contractAmount === '') {
      error = 'Please enter contract amount';
    } else if (this.state.storageValue === '') {
      error = 'Please enter storage value';
    } else if (this.props.selectedContractAmountBalance === '0.000') {
      error = 'Not enough balance to deploy the contract';
    } else if (
      parseInt(this.state.contractAmount, 10) >
      parseInt(this.props.selectedContractAmountBalance, 10)
    ) {
      error =
        'The entered contract amount should be less than available account balance';
    }
    if (error === '') {
      let contract = '';
      if (this.state.contractFile !== '') {
        contract = fs
          .readFileSync(this.state.contractFile[0].path)
          .toString('utf-8');
      } else if (this.state.enteredContract !== '') {
        contract = this.state.enteredContract;
      }
      this.props.deployContractAction({
        contract,
        ...this.props,
        ...this.state,
      });
      setTimeout(() => {
        this.props.toggleButtonState();
      }, 1000);
    }
    if (error !== '') {
      this.setState({ error });
    }
  }

  handleInputChange(event) {
    const self = this;
    if (event.target.name === 'contractFile') {
      const contract = fs
        .readFileSync(event.target.files[0].path)
        .toString('utf-8');
      const stateParams = {
        [event.target.name]: event.target.files,
      };
      this.handleGetInitialStorage(contract).then((storageFormat) => {
        self.setState({
          ...stateParams,
          storageFormat,
        });
      });
    } else if (event.target.name === 'enteredContract') {
      const stateParams = {
        [event.target.name]: event.target.files,
      };
      this.handleGetInitialStorage(event.target.value).then((storageFormat) => {
        self.setState({
          ...stateParams,
          storageFormat,
        });
      });
    } else if (event.target.name === 'accounts') {
      this.setState({ [event.target.name]: event.target.value }, () => {
        this.props.getAccountBalanceAction({
          ...this.props,
          pkh: this.state.accounts,
        });
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const Accounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {elem.account}
      </option>
    ));
    if (this.state.error !== '') {
      swal('Error!', this.state.error, 'error').then(() => {
        return this.setState({ error: '' });
      });
    }
    return (
      <div className="transactions-contents">
        <div className="modal-input">
          <div className="input-container">Select Wallet </div>
          <select
            className="custom-select"
            name="accounts"
            value={this.state.accounts}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select account to deploy contract
            </option>
            {Accounts}
          </select>
        </div>
        {this.state.accounts !== '0' ? (
          <div className="container-msg">
            <b>
              available balance in the account{' '}
              <span className="tezos-icon">
                {this.props.selectedContractAmountBalance} ꜩ
              </span>
            </b>
          </div>
        ) : (
          ''
        )}
        <div className="modal-input">
          <div className="input-container">Upload Contract </div>
          <div className="custom-file">
            <input
              type="file"
              placeholder="Select smart contract"
              name="contractFile"
              accept=".tz"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="modal-input">
          <div className="input-container">----- OR -----</div>
        </div>
        <div className="modal-input">
          <div className="input-container">Enter Contract </div>
          <div className="custom-file">
            <textarea
              placeholder="Enter your michelson contract"
              name="enteredContract"
              className="form-control"
              accept=".tz"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="modal-input">
          <div className="input-container">Contract label </div>
          <input
            type="text"
            name="contractLabel"
            className="form-control"
            placeholder="Enter label name to identify contract"
            value={this.state.contractLabel}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="modal-input">
          <div className="input-container">Contract Amount </div>
          <input
            type="number"
            name="contractAmount"
            className="form-control"
            placeholder="Enter amount to deploy contract"
            value={this.state.contractAmount}
            onChange={this.handleInputChange}
          />
        </div>
        {this.state.storageFormat ? (
          <span>
            Please enter initial storage in the following format
            <div className="modal-input" style={{ backgroundColor: '#f1f3f5' }}>
              <p>{this.state.storageFormat}</p>
            </div>
          </span>
        ) : (
          ''
        )}
        <div className="modal-input">
          <div className="input-container">Initial Storage </div>
          <textarea
            name="storageValue"
            className="form-control"
            placeholder="Initial value for account"
            value={this.state.storageValue}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="cards-container">
          <div className="cards button-card accounts-button-container">
            <div className="button-accounts">
              <button
                type="button"
                className="btn btn-success"
                disabled={this.props.buttonState}
                onClick={this.handleDeployContract}
              >
                {this.props.buttonState ? 'Please wait....' : 'Deploy Contract'}
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default DeployContract;
