/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';

const conseiljs = require('conseiljs');

class InvokeContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      selectedContracts: '0',
      entryPoints: [],
      contractLabel: '',
      storageValue: '',
      selectedEntryPoint: '0',
      error: '',
      enteredContract: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInvokeContract = this.handleInvokeContract.bind(this);
    this.handleEntryPoints = this.handleEntryPoints.bind(this);
    this.getEntryPointsTable = this.getEntryPointsTable.bind(this);
    this.handleEntryPointsInputValues = this.handleEntryPointsInputValues.bind(
      this
    );
  }

  handleEntryPointsInputValues(event) {
    const entryPoints = this.state.entryPoints.map(elem => {
      const temp = { ...elem };
      if (elem.name === this.state.selectedEntryPoint) {
        const stateValues = elem.stateValues.map(pp => {
          if (event.target.name === Object.keys(pp)[0]) {
            return { [event.target.name]: event.target.value };
          }
          return pp;
        });
        temp.stateValues = stateValues;
        return temp;
      }
      return elem;
    });
    this.setState({ entryPoints });
  }

  handleEntryPoints() {
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const contract = JSON.parse(localStorage.getItem('tezsure')).contracts[
      networkId
    ].filter(
      elem => elem.originated_contracts === this.state.selectedContracts
    );
    const entryPoints = conseiljs.TezosContractIntrospector.generateEntryPointsFromCode(
      contract[0].contract
    );
    const values = entryPoints.map(p => ({
      name: p.name,
      structure: p.structure,
      parameter: p.parameters.map(pp => pp.name),
      parameterTypes: p.parameters.map(pp => pp.type),
      stateValues: p.parameters.map(pp => ({ [pp.name]: '' }))
    }));
    this.setState({ entryPoints: values });
  }

  handleInvokeContract() {
    let index = 0;
    this.state.entryPoints.some(elem => {
      if (elem.name === this.state.selectedEntryPoint) {
        const storageValue = elem.structure
          .split('$')
          .map(pp => {
            if (pp.indexOf('PARAM') === -1) {
              return pp;
            }
            const value = Object.values(elem.stateValues[index])[0];
            index += 1;
            return pp.replace('PARAM', value);
          })
          .join('');
        this.setState({ storageValue }, () => {
          this.props.handleInvokeContractAction({
            ...this.props,
            ...this.state
          });
          setTimeout(() => {
            this.props.toggleButtonState();
          }, 1000);
        });
        return true;
      }
      return false;
    });
  }

  handleInputChange(event) {
    if (event.target.name === 'accounts') {
      this.setState({ [event.target.name]: event.target.value }, () => {
        this.props.getAccountBalanceAction({
          ...this.props,
          pkh: this.state.accounts
        });
      });
    } else if (event.target.name === 'selectedContracts') {
      this.setState({ [event.target.name]: event.target.value }, () => {
        this.handleEntryPoints();
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  getEntryPointsTable() {
    const selectedEntryPoint = this.state.entryPoints.filter(
      elem => elem.name === this.state.selectedEntryPoint
    );
    const tableHeaders = selectedEntryPoint[0].parameter.map(elem => (
      <th scope="col" className="table-column-header" key={elem}>
        {elem}
      </th>
    ));
    const tableBody = selectedEntryPoint[0].parameter.map((elem, index) => (
      <td className="table-body-cell" key={elem}>
        <input
          type={
            selectedEntryPoint[0].parameterTypes[index] === 'nat'
              ? 'number'
              : 'text'
          }
          name={elem}
          value={selectedEntryPoint[0].stateValues[elem]}
          placeholder={`type - ${selectedEntryPoint[0].parameterTypes[index]}`}
          className="form-control"
          onChange={this.handleEntryPointsInputValues}
        />
      </td>
    ));
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="thead-dark">{tableHeaders}</tr>
        </thead>
        <tbody>
          <tr className="table-row">{tableBody}</tr>
        </tbody>
      </table>
    );
  }

  render() {
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const entryPoints = this.state.entryPoints.map((elem, index) => (
      <option key={elem.name + index} value={elem.name}>
        {elem.name}
      </option>
    ));
    const Accounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {elem.account}
      </option>
    ));
    const __localStorage__ = JSON.parse(localStorage.getItem('tezsure'))
      .contracts;
    const contracts = __localStorage__[networkId].map((elem, index) => (
      <option key={elem.name + index} value={elem.originated_contracts}>
        {`${elem.name} - ${elem.originated_contracts}`}
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
            <div className="success-msg">
              {`available balance in the account ${this.props.selectedContractAmountBalance}`}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="modal-input">
          <div className="input-container">Select Contract </div>
          <select
            className="custom-select"
            name="selectedContracts"
            value={this.state.selectedContracts}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select contracts
            </option>
            {contracts}
          </select>
        </div>
        <div className="modal-input">
          <div className="input-container">Entry Points </div>
          <select
            className="custom-select"
            name="selectedEntryPoint"
            value={this.state.selectedEntryPoint}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select Entry Point
            </option>
            {entryPoints}
          </select>
        </div>
        <div className="modal-input">
          {this.state.selectedEntryPoint !== '0'
            ? this.getEntryPointsTable()
            : ''}
        </div>
        <div className="cards-container">
          <div className="cards button-card accounts-button-container">
            <div className="button-accounts">
              <button
                type="button"
                className="btn btn-success"
                disabled={this.props.buttonState}
                onClick={this.handleInvokeContract}
              >
                {this.props.buttonState ? 'Please wait....' : 'Invoke Contract'}
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

export default InvokeContract;
