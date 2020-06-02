/* eslint-disable prefer-const */
/* eslint-disable promise/always-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';
const { storageName } = require('../../../../apis/config');
const LOCAL_STORAGE_NAME = storageName;

class DeployContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      contractLabel: '',
      storageValue: '',
      contractAmount: '',
      error: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeployContract = this.handleDeployContract.bind(this);
  }

  handleDeployContract() {
    let error = '';
    const {
      sucessMsg,
      parseError,
      michelsonCode,
      dashboardHeader,
      selectedContractAmountBalance,
    } = this.props;
    let { accounts, contractLabel, storageValue, contractAmount } = this.state;

    contractAmount = contractAmount === '' ? 0 : contractAmount;

    if (michelsonCode === '') {
      error = 'Please upload a contract or write a michelson contract';
    } else if (parseError !== '') {
      error = 'Please resolve compilation error before deployment';
    } else if (sucessMsg === '') {
      error = 'Please compile contract before deployment';
    } else if (accounts === '0') {
      error = 'Please select an account';
    } else if (contractLabel === '') {
      error = 'Please enter contract label';
    } else if (contractLabel !== '') {
      const networkId = dashboardHeader.networkId.split('-')[0];
      const contract = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
        .contracts[networkId];
      if (contract.filter((elem) => elem.name === contractLabel).length > 0) {
        error = 'Label already in use, please choose a different label';
      }
    }
    if (storageValue === '') {
      error = 'Please enter storage value';
    } else if (selectedContractAmountBalance === '0.000') {
      error = 'Not enough balance to deploy the contract';
    } else if (
      parseInt(contractAmount, 10) >
      parseInt(selectedContractAmountBalance, 10) * 1000000
    ) {
      error =
        'The entered contract amount should be less than available account balance';
    }
    if (error === '' && sucessMsg !== '' && parseError === '') {
      let contract = '';
      if (michelsonCode !== '') {
        contract = michelsonCode;
      }
      this.props.deployContractAction({
        contract,
        accounts,
        contractLabel,
        storageValue,
        contractAmount,
        ...this.props,
      });
      this.props.getAccountBalanceAction({
        ...this.props,
        pkh: this.state.accounts,
      });
    }
    if (error !== '') {
      this.setState({ error });
    }
  }

  handleInputChange(event) {
    if (event.target.name === 'accounts') {
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
        {`${elem.label}-${elem.account}`}
      </option>
    ));
    if (this.state.error !== '') {
      swal('Error!', this.state.error, 'error').then(() => {
        return this.setState({ error: '' });
      });
    }
    return (
      <div className="deploy-contents">
        <div className="modal-input">
          <div className="input-container">Select Wallet* </div>
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
              Available balance in the account{' '}
              <span className="tezos-icon">
                {this.props.selectedContractAmountBalance} ꜩ
              </span>
            </b>
          </div>
        ) : (
          ''
        )}
        <div className="modal-input">
          <div className="input-container">Contract label* </div>
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
          <span
            className="contract-amount-input"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <input
              type="number"
              name="contractAmount"
              className="form-control"
              placeholder="Enter amount to deploy contract"
              value={this.state.contractAmount}
              style={{ marginRight: '10px' }}
              onChange={this.handleInputChange}
            />
            <span className="tezos-icon">ꜩ</span>
          </span>
        </div>
        {this.props.dashboardHeader.networkId !== 'Localnode' ? (
          <div className="transactions-contents">
            <div className="modal-input" style={{ paddingBottom: '0px' }}>
              <p style={{ marginBottom: '0px' }}>
                Note: It may take upto 1 minute for the contract to get commited
                on carthagenet network.
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.props.storageFormat ? (
          <span>
            Please enter initial storage in the following format
            <div className="modal-input" style={{ backgroundColor: '#f1f3f5' }}>
              <p>{this.props.storageFormat}</p>
            </div>
            <p>
              Note: please use quotes for string eg: &quot;hello world&quot;
            </p>
          </span>
        ) : (
          ''
        )}
        <div className="modal-input">
          <div className="input-container">Initial Storage* </div>
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
                {this.props.buttonState
                  ? 'Please wait....'
                  : 'Save and Deploy Contract'}
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
