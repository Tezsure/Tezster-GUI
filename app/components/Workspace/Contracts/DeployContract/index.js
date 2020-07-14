/* eslint-disable prefer-const */
/* eslint-disable promise/always-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';
import GetExampleStorage from '../GetExampleStorage';

const conseiljs = require('conseiljs');
const fs = require('fs');

const { storageName } = require('../../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = storageName;

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
      gasLimit: 100000,
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
    let {
      accounts,
      contractFile,
      enteredContract,
      contractLabel,
      storageValue,
      gasLimit,
      contractAmount,
    } = this.state;

    contractAmount = contractAmount === '' ? 0 : contractAmount;
    const gasPrice = (parseInt(gasLimit, 10) || 100000 / 1000000).toFixed(3);

    if (accounts === '0') {
      error = 'Please select an account';
    } else if (contractFile === '') {
      error = 'Please upload a contract';
    } else if (contractLabel === '') {
      error = 'Please enter contract label';
    } else if (contractLabel !== '') {
      const networkId = this.props.dashboardHeader.networkId.split('-')[0];
      const contract = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
        .contracts[networkId];
      if (
        contract.filter((elem) => elem.name === this.state.contractLabel)
          .length > 0
      ) {
        error = 'Label already in use, please choose a different label';
      }
    } else if (contractAmount === '') {
      error = 'Please enter contract amount';
    } else if (storageValue === '') {
      error = 'Please enter storage value';
    } else if (this.props.selectedContractAmountBalance === '0.000') {
      error = 'Not enough balance to deploy the contract';
    } else if (gasLimit < 100000) {
      error = 'Gas limit cannot be less than 10000';
    } else if (gasPrice > this.props.selectedContractAmountBalance) {
      error = "Gas limit cannot be greater than selected contract's balance";
    } else if (
      parseInt(contractAmount, 10) >
      parseInt(this.props.selectedContractAmountBalance, 10) * 1000000
    ) {
      error =
        'The entered contract amount should be less than available account balance';
    }
    if (error === '') {
      let contract = '';
      if (contractFile !== '') {
        contract = fs.readFileSync(contractFile[0].path).toString('utf-8');
      }
      this.props.deployContractAction({
        ...this.props,
        accounts,
        contract,
        enteredContract,
        contractLabel,
        storageValue,
        gasLimit,
        contractAmount,
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
    const self = this;
    if (event.target.name === 'contractFile') {
      const contract = fs
        .readFileSync(event.target.files[0].path)
        .toString('utf-8');
      const stateParams = {
        [event.target.name]: event.target.files,
      };
      this.handleGetInitialStorage(contract).then((storageFormat) => {
        const storageValue = GetExampleStorage(storageFormat);
        self.setState({
          ...stateParams,
          storageFormat,
          storageValue,
        });
      });
    } else if (event.target.name === 'enteredContract') {
      const stateParams = {
        [event.target.name]: event.target.value,
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
    } else if (event.target.type === 'number') {
      if (event.target.value >= 0) {
        this.setState({ [event.target.name]: event.target.value });
      }
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
      <div className="transactions-contents contract-container">
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
          <div className="container-msg" style={{ marginLeft: '28%' }}>
            <b>
              &nbsp;Available balance in the account{' '}
              <span className="tezos-icon">
                {this.props.selectedContractAmountBalance} ꜩ
              </span>
            </b>
          </div>
        ) : (
          ''
        )}
        <div className="modal-input">
          <div className="input-container">Upload Contract* </div>
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
          <div className="input-container" style={{ width: '28%' }}>
            Gas Limit{' '}
          </div>
          <input
            type="number"
            name="gasLimit"
            className="form-control"
            placeholder="Enter gas limit to deploy contract"
            value={this.state.gasLimit || 100000}
            style={{ width: '50%', marginRight: '10px' }}
            onChange={this.handleInputChange}
          />
          <span className="tezos-icon">
            <b>mu</b>ꜩ
          </span>
        </div>
        <div className="modal-input">
          <div className="input-container" style={{ width: '28%' }}>
            Contract Amount{' '}
          </div>
          <input
            type="number"
            min="0"
            name="contractAmount"
            className="form-control"
            placeholder="Enter amount to deploy contract"
            value={this.state.contractAmount}
            onChange={this.handleInputChange}
            style={{ width: '50%', marginRight: '10px' }}
          />
          <span className="tezos-icon">ꜩ</span>
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
        {this.state.storageFormat ? (
          <span>
            Please enter initial storage in the following format
            <div className="modal-input" style={{ backgroundColor: '#f1f3f5' }}>
              <p>{this.state.storageFormat}</p>
            </div>
            <p>
              Note: please use quotes for string eg: &quot;hello world&quot;
            </p>
            <p>
              Note: We have generated an example initial storage for your
              purpose it&rsquo;s 95% accurate hence we recommend you to use it
              at your own risk
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
              {this.props.buttonState ? (
                <button className="btn btn-success" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Please wait...
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={this.props.buttonState}
                  onClick={this.handleDeployContract}
                >
                  Deploy Contract
                </button>
              )}
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
