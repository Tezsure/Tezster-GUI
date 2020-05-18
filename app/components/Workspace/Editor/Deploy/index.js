/* eslint-disable promise/always-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';
// import JSONPretty from 'react-json-pretty';

class DeployContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      contractFile: '',
      contractLabel: '',
      storageValue: '',
      contractAmount: '',
      error: '',
      enteredContract: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeployContract = this.handleDeployContract.bind(this);
  }

  handleDeployContract() {
    let error = '';
    const { sucessMsg, parseError } = this.props;
    if (this.props.michelsonCode === '') {
      error = 'Please upload a contract or write a michelson contract';
    } else if (sucessMsg === '') {
      error = 'Please compile contract before deployment';
    } else if (parseError !== '') {
      error = 'Please resolve compilation error before deployment';
    } else if (this.state.accounts === '0') {
      error = 'Please select an account';
    } else if (this.state.contractLabel === '') {
      error = 'Please enter contract label';
    } else if (this.state.contractLabel !== '') {
      const networkId = this.props.dashboardHeader.networkId.split('-')[0];
      const contract = JSON.parse(localStorage.getItem('tezsure')).contracts[
        networkId
      ];
      if (
        contract.filter((elem) => elem.name === this.state.contractLabel)
          .length > 0
      ) {
        error = 'Label already in use, please choose a different label';
      }
    } else if (this.state.contractAmount === '') {
      error = 'Please enter contract amount';
    } else if (this.state.storageValue === '') {
      error = 'Please enter storage value';
    } else if (this.props.selectedContractAmountBalance === '0.000') {
      error = 'Not enough balance to deploy the contract';
    } else if (
      parseInt(this.state.contractAmount, 10) >
      parseInt(this.props.selectedContractAmountBalance, 10) * 1000000
    ) {
      error =
        'The entered contract amount should be less than available account balance';
    }
    if (error === '' && sucessMsg !== '' && parseError === '') {
      let contract = '';
      if (this.props.michelsonCode !== '') {
        contract = this.props.michelsonCode;
      }
      this.props.deployContractAction({
        contract,
        ...this.props,
        ...this.state,
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
              &nbsp;&nbsp;Available balance in the account{' '}
              <span className="tezos-icon">
                {this.props.selectedContractAmountBalance} ꜩ
              </span>
            </b>
          </div>
        ) : (
          ''
        )}
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
