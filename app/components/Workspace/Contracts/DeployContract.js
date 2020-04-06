/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';

const fs = require('fs');

class DeployContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      contractFile: '',
      contractLabel: '',
      storageValue: '',
      error: '',
      enteredContract: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeployContract = this.handleDeployContract.bind(this);
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
    } else if (this.state.storageValue === '') {
      error = 'Please enter storage value';
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
        ...this.state
      });
    }
    if (error !== '') {
      this.setState({ error });
    }
  }

  handleInputChange(event) {
    if (event.target.name === 'contractFile') {
      this.setState({ [event.target.name]: event.target.files });
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
              Select account to display transactions
            </option>
            {Accounts}
          </select>
        </div>
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
              name="contractFile"
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
            placeholder="Contract Label"
            value={this.state.contractLabel}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="modal-input">
          <div className="input-container">Initial Storage </div>
          <input
            type="text"
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
                onClick={this.handleDeployContract}
              >
                Deploy Contract
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
